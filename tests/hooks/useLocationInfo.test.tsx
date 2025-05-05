import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useLocationInfo } from '../../src/hooks/useLocationInfo';


vi.mock('axios');
const mockedAxios = axios as unknown as { get: vi.Mock };

describe('useLocationInfo', () => {
    it('fetches location info successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [{
                LocalizedName: 'Istanbul',
                AdministrativeArea: { LocalizedName: 'Istanbul' },
                Country: { LocalizedName: 'Turkey' }
            }]
        });

        const { result } = renderHook(() => useLocationInfo('Istanbul'));

        await waitFor(() => {
            expect(result.current).toEqual({
                city: 'Istanbul',
                region: 'Istanbul',
                country: 'Turkey'
            });
        });
    });

    it('handles error and returns null location', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useLocationInfo('InvalidCity'));

        await waitFor(() => {
            expect(result.current).toBeNull();
        });
    });
});
