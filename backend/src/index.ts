import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import OpenSkyService from './services/opensky/opensky.service';

const app = express();
const PORT = process.env.PORT || 5174;
const server = createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// test endpoint
app.get('/api/getOpenSkyToken', async (req, res) => {
  try {
    const token = await OpenSkyService.getToken();
    res.json({ token });
  } catch (error) {
    console.error('Error fetching OpenSky token:', error);
    res.status(500).json({ error: 'Failed to fetch OpenSky token' });
  }
});

app.get('/api/fetchLiveFlights', async (req, res) => {
  try {
    const flights = await OpenSkyService.fetchLiveFlights();
    res.json({ flights });
  } catch (error) {
    console.error('Error fetching live flights:', error);
    res.status(500).json({ error: 'Failed to fetch live flights' });
  }
});