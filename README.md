<p align="center">
  <img src="./public/logo.svg" alt="SkyTrack" width="120" />
</p>

<h1 align="center">✈️ Flight Tracking Web App</h1>

<p align="center">
  A real-time flight tracking app inspired by Flightradar24 — built with React, MapLibre GL, and AviationStack API.
</p>

<p align="center">
  <a href="https://sky-tracking.netlify.app/">🌐 Live Demo</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="MapLibre" src="https://img.shields.io/badge/MapLibre_GL-5.6-396CB2?style=for-the-badge&logo=maplibre&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Bun" src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white">
</p>

---


## 📸 Screenshots

> <img src="./assets/1.png" width="49%"> <img src="./assets/2.png" width="49%">
> <img src="./assets/3.png" width="100%">

---

## ✨ Features

- 🗺️ **Interactive Map** — Live flight positions rendered on a MapLibre GL map with real-time updates
- 🔍 **Flight Detail View** — Select any flight to track its route, altitude, speed, and status changes
- ♾️ **Infinite Scroll** — Flight list loads progressively as you scroll, paginated via AviationStack API
- 📱 **Fully Responsive** — Optimized layout for both desktop and mobile devices
- 🔎 **Filters** — Filter flights by departure country or airline
- ⚡ **Data Caching** — Backend caches API responses to minimize external requests and improve performance
- 🛫 **Live Flight Data** — Powered by [AviationStack](https://aviationstack.com/) API

---

## 🗂️ Project Structure

```
flight-tracking-web-app/
├── src/                  # Frontend source
│   ├── components/       # UI components (map, flight list, cards)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service layer
│   ├── store/            # Redux store & slices
│   └── data/             # Static data & utilities
├── backend/              # Express + tRPC server
│   └── src/
│       ├── index.ts      # Entry point
│       └── ...           # Routes, cache, middleware
└── public/               # Static assets
```

---

## 🖥️ Frontend

Built with React 19 and Vite, rendered on a MapLibre GL interactive map.

- **Path**: [`src`](./src)
- **Tech Stack**: React 19, TypeScript, MapLibre GL, React Map GL, TanStack Query, Redux Toolkit, Framer Motion, TailwindCSS, React Router

**Setup:**
```bash
npm install
npm run dev
```

---

## ⚙️ Backend

A lightweight Express server with tRPC, acting as a proxy to AviationStack with built-in response caching.

- **Path**: [`backend`](./backend)
- **Tech Stack**: Express 5, tRPC, Zod, Axios, Geolib, Bun

**Setup:**
```bash
cd backend
bun install
bun dev
```

---

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/your-username/flight-tracking-web-app.git
cd flight-tracking-web-app
```

2. Install dependencies:
```bash
npm install
cd backend && bun install && cd ..
```

3. Set up environment variables:
```bash
# .env (root)
VITE_API_KEY=your_aviationstack_key

# backend/.env
AVIATIONSTACK_API_KEY=your_aviationstack_key
```

4. Run both client and server:
```bash
npm run dev          # frontend
npm run dev:server   # backend (separate terminal)
```

---

## 🛠️ Technologies

### Frontend
![React](https://img.shields.io/badge/React-19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-396CB2?style=for-the-badge&logo=maplibre&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend
![Express](https://img.shields.io/badge/Express-5-404D59?style=for-the-badge&logo=express&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

---

## 🎯 Summary

A full-stack flight tracking application that brings real-time aviation data to life on an interactive map. Track active flights globally, dive into individual flight details, and filter by country or airline — all in a responsive interface that works seamlessly on desktop and mobile.

Data is sourced from **AviationStack** and cached on the backend to keep things fast and API-quota friendly.
