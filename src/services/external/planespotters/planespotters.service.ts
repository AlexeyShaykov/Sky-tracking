import { API_URL } from './planespotters.constants';
import type { TPlaneSpotterPhotoResponse } from './planespotters.types';

const fetchAircraftPhoto = async (icao24: string): Promise<string | null> => {
  try {
    const res = await fetch(`${API_URL}/${icao24}`);
    const data: TPlaneSpotterPhotoResponse = await res.json();
    return data.photos?.[0]?.thumbnail_large?.src ?? null;
  } catch {
    return null;
  }
};

export {
  fetchAircraftPhoto,
};