import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

interface LocationData {
    city: string;
    region: string;
    country: string;
}

export const useLocationInfo = (query: string) => {
    const [location, setLocation] = useState<LocationData | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/locations/v1/cities/search`,
                    { params: { apikey: API_KEY, q: query } }
                );

                const data = res.data[0];

                setLocation({
                    city: data.LocalizedName,
                    region: data.AdministrativeArea.LocalizedName,
                    country: data.Country.LocalizedName
                });
            } catch (err) {
                console.error('Konum verisi alınamadı:', err);
                setLocation(null);
            }
        };

        if (query) fetchLocation();
    }, [query]);

    return location;
};
