import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

export const fetchCoordinatesByLocationName = async (city: string) => {
    const response = await axios.get(`${BASE_URL}/locations/v1/cities/search`, {
        params: {
            q: city,
            apikey: API_KEY,
        },
    });

    return response.data;
};

export const fetchDayForecast = async (locationKey: string) => {
    const response = await axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`, {
        params: {
            apikey: API_KEY,
            metric: true,
        },
    });

    return response.data;
};

export const fetchLocationKeyByCoords = async (lat: number, lon: number) => {
    const response = await axios.get(`${BASE_URL}/locations/v1/cities/geoposition/search`, {
        params: {
            apikey: API_KEY,
            q: `${lat},${lon}`,
            details: true,
        },
    });

    return response.data;
};
