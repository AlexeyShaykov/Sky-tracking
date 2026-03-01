import dotenv from 'dotenv';
import axios from 'axios';
import { API_TOKEN_URL, API_URL } from './opensky.constants';
import type { IOpenSkyResponse, IOpenSkyTokenResponse } from './opensky.types';



dotenv.config();

const OpenSkyService = {
  token: '' as string,
  tokenExpirationAT: 0 as number,

  async getToken() {
    if (this.token && this.tokenExpirationAT > Date.now()) {
      return this.token;
    }

    try {
      const params = new URLSearchParams();
      params.append('client_id', process.env.OPENSKY_CLIENT_ID!);
      params.append('client_secret', process.env.OPENSKY_CLIENT_SECRET!);
      params.append('grant_type', 'client_credentials');

      const response = await axios.post<IOpenSkyTokenResponse>(API_TOKEN_URL, params);
      const data = response.data;
      this.token = data.access_token;
      this.tokenExpirationAT = Date.now() + (data.expires_in - 300) * 1000; // Subtract 5 minutes to ensure we refresh the token before it expires

      console.log('Fetched new OpenSky token, expires at:', new Date(this.tokenExpirationAT).toISOString());
      
      return this.token;
    } catch (error) {
      console.error('Error fetching OpenSky token:', error);
      throw error;
    }
  },
  async getAuthHeaders() {
    if (!this.token || this.tokenExpirationAT <= Date.now()) {
      await this.getToken();
    }

    const token = await this.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  },

  async getFlightByIcao24(icao24: string) {
      const headers = await this.getAuthHeaders();

      const response = await axios.get<IOpenSkyResponse>(
				`${API_URL}/tracks/all`,
				{
					params: { icao24, time: 0 },
					headers
				}
			)
      return response.data;
  },

  async fetchLiveFlights() {
    const headers = await this.getAuthHeaders();

    const response = await axios.get('https://opensky-network.org/api/states/all', { headers });
    return response.data;
  }
}

export default OpenSkyService;