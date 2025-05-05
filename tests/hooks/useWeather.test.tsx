
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useForecast } from '../../src/hooks/useWeather';
import * as weatherService from '../../src/services/weatherService';

vi.mock('../../src/services/weatherService', async () => {
    const actual = await import('../../src/services/weatherService');
    return {
        ...actual,
        fetchCoordinatesByLocationName: vi.fn(),
        fetchDayForecast: vi.fn(),
    };
});

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useForecast', () => {
    it('fetches forecast when city is valid', async () => {
        (weatherService.fetchCoordinatesByLocationName as vi.Mock).mockResolvedValueOnce([
            { Key: '12345' },
        ]);
        (weatherService.fetchDayForecast as vi.Mock).mockResolvedValueOnce({ forecast: 'sunny' });

        const { result } = renderHook(() => useForecast('Istanbul'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual({ forecast: 'sunny' });
    });

    it('throws error when city not found', async () => {
        (weatherService.fetchCoordinatesByLocationName as vi.Mock).mockResolvedValueOnce([]);

        const { result } = renderHook(() => useForecast('UnknownCity'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(false);
        });

        expect(result.current.error).toBeDefined();
    });
});
