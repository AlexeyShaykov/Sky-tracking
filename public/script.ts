// enrich-airports.ts
// Запуск: npx ts-node enrich-airports.ts
// или: npx tsx enrich-airports.ts

import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

type Airport = {
  id: string;
  iata_code: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  municipality: string;
  iso_country: string;
  [key: string]: string;
};

const INPUT_FILE = './public/airports.csv';
const OUTPUT_FILE = './public/airports-enriched.csv';
const PROGRESS_FILE = './public/enrich-progress.json';
const DELAY_MS = 1100; // Nominatim разрешает 1 запрос в секунду

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getCityFromCoords(lat: string, lon: string): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'airports-enricher/1.0' }, // Nominatim требует User-Agent
    });

    if (!res.ok) return null;

    const data = await res.json();
    const addr = data.address;

    // берём наиболее подходящее поле
    return addr.city || addr.town || addr.village || addr.county || addr.state || null;
  } catch {
    return null;
  }
}

async function main() {
  // читаем CSV
  const text = fs.readFileSync(INPUT_FILE, 'utf-8');
  const { data } = Papa.parse<Airport>(text, { header: true, skipEmptyLines: true });

  console.log(`Всего аэропортов: ${data.length}`);

  // загружаем прогресс если есть
  let progress: Record<string, string> = {};
  if (fs.existsSync(PROGRESS_FILE)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    console.log(`Продолжаем, уже обработано: ${Object.keys(progress).length}`);
  }

  // обрабатываем только аэропорты с iata_code (остальные не нужны)
  const airports = data.filter(a => a.iata_code);
  console.log(`Аэропортов с IATA кодом: ${airports.length}`);

  let processed = 0;

  for (const airport of airports) {
    const key = airport.iata_code;

    // уже обработан — пропускаем
    if (progress[key] !== undefined) continue;

    const city = await getCityFromCoords(airport.latitude_deg, airport.longitude_deg);
    progress[key] = city || airport.municipality; // fallback на оригинал если не нашли

    processed++;

    if (processed % 10 === 0) {
      // сохраняем прогресс каждые 10 запросов
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
      console.log(`Обработано: ${processed}, последний: ${key} → ${progress[key]}`);
    }

    await sleep(DELAY_MS);
  }

  // финальное сохранение прогресса
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  // применяем enriched данные и сохраняем новый CSV
  const enriched = data.map(a => ({
    ...a,
    municipality: a.iata_code && progress[a.iata_code] ? progress[a.iata_code] : a.municipality,
  }));

  const csv = Papa.unparse(enriched);
  fs.writeFileSync(OUTPUT_FILE, csv, 'utf-8');

  console.log(`\nГотово! Сохранено в ${OUTPUT_FILE}`);

  // удаляем файл прогресса
  if (fs.existsSync(PROGRESS_FILE)) fs.unlinkSync(PROGRESS_FILE);
}

main().catch(console.error);