import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCoordsByCity } from '../../src/services/locationService';

global.fetch = vi.fn();

describe('fetchCoordsByCity', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('returns coordinates when city is found', async () => {
        const mockResponse = {
            json: () => Promise.resolve([
                {
                    GeoPosition: {
                        Latitude: 40.7128,
                        Longitude: -74.006,
                    },
                },
            ]),
            ok: true,
        };

        (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

        const result = await fetchCoordsByCity('New York');

        expect(result).toEqual({
            lat: 40.7128,
            lon: -74.006,
        });
    });

    it('throws error when city is not found', async () => {
        const mockResponse = {
            json: () => Promise.resolve([]),
            ok: true,
        };

        (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

        await expect(fetchCoordsByCity('UnknownCity')).rejects.toThrow('City not found');
    });

    it('throws error on HTTP failure', async () => {
        const mockResponse = {
            ok: false,
            status: 500,
        };

        (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

        await expect(fetchCoordsByCity('AnyCity')).rejects.toThrow('HTTP error! status: 500');
    });
});
