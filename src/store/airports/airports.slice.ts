// store/airports/airports.slice.ts
import Papa from 'papaparse';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Airport = {
  iata_code: string;
  name: string;
  municipality: string;
  iso_country: string;
};

type AirportsState = {
  data: Record<string, Airport>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export const loadAirports = createAsyncThunk('airports/load', async () => {
  const res = await fetch('/airports.csv');
  const text = await res.text();
  const { data } = Papa.parse<Airport>(text, { header: true, skipEmptyLines: true });

  const airportMap: Record<string, Airport> = {};
  data.forEach(a => {
    if (a.iata_code) airportMap[a.iata_code] = a;
  });

  return airportMap;
});

const airportsSlice = createSlice({
  name: 'airports',
  initialState: { data: {}, status: 'idle' } as AirportsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAirports.pending, (state) => { state.status = 'loading'; })
      .addCase(loadAirports.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadAirports.rejected, (state) => { state.status = 'failed'; });
  },
});

export default airportsSlice.reducer;