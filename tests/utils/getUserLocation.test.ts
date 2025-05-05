import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserLocation } from '../../src/utils/getUserLocation';

describe('getUserLocation', () => {
    const mockGeolocation = {
        getCurrentPosition: vi.fn(),
    };

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should reject if geolocation is not supported', async () => {
        vi.stubGlobal('navigator', { geolocation: undefined });

        await expect(getUserLocation()).rejects.toThrow('Geolocation is not supported');
    });

    it('should resolve with position if geolocation succeeds', async () => {
        const fakePosition = {
            coords: {
                latitude: 10,
                longitude: 20,
            },
            timestamp: Date.now(),
        };

        mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
            success(fakePosition);
        });

        vi.stubGlobal('navigator', { geolocation: mockGeolocation });

        const result = await getUserLocation();
        expect(result).toEqual(fakePosition);
    });

    it('should reject if geolocation fails', async () => {
        const error = new Error('Permission denied');

        mockGeolocation.getCurrentPosition.mockImplementationOnce((_success, failure) => {
            failure(error);
        });

        vi.stubGlobal('navigator', { geolocation: mockGeolocation });

        await expect(getUserLocation()).rejects.toThrow('Permission denied');
    });
});