import { useQuery } from '@tanstack/react-query';
import { fetchCoordinatesByLocationName, fetchDayForecast } from '../services/weatherService';

export const useForecast = (city: string) => {
    return useQuery({
        queryKey: ['forecast', city],
        queryFn: async () => {
            const coords = await fetchCoordinatesByLocationName(city);
            if (!coords || coords.length === 0) {
                throw new Error('City not found');
            }
            const locationKey = coords[0].Key;
            return fetchDayForecast(locationKey);
        },
        enabled: !!city,
    });
};
