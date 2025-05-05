import { API_KEY, BASE_URL } from '../config';

export const fetchCoordsByCity = async (city: string) => {
    try {
        const res = await fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.length === 0) {
            throw new Error('City not found');
        }

        return {
            lat: data[0].GeoPosition.Latitude,
            lon: data[0].GeoPosition.Longitude,
        };
    } catch (error) {
        console.error('fetchCoordsByCity error:', error);
        throw error;
    }
};
