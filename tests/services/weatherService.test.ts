import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import * as weatherService from '../../src/services/weatherService';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('weatherService', () => {
    it('fetchCoordinatesByLocationName returns data', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [{ Key: '12345', LocalizedName: 'Istanbul' }]
        });

        const result = await weatherService.fetchCoordinatesByLocationName('Istanbul');
        expect(result).toEqual([{ Key: '12345', LocalizedName: 'Istanbul' }]);
        expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('fetchDayForecast returns forecast data', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { DailyForecasts: [] }
        });

        const result = await weatherService.fetchDayForecast('12345');
        expect(result).toEqual({ DailyForecasts: [] });
    });

    it('fetchLocationKeyByCoords returns location data', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { Key: '67890', LocalizedName: 'Ankara' }
        });

        const result = await weatherService.fetchLocationKeyByCoords(39.92, 32.85);
        expect(result).toEqual({ Key: '67890', LocalizedName: 'Ankara' });
    });
});
