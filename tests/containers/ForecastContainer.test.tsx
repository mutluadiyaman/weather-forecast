import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ForecastContainer from '../../src/containers/ForecastContainer';
import { useForecast } from '../../src/hooks/useWeather';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/hooks/useWeather', () => ({
    useForecast: vi.fn(),
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

describe('ForecastContainer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        (useForecast as any).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <ForecastContainer city="London" />
            </BrowserRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useForecast as any).mockReturnValue({
            data: null,
            isLoading: false,
            error: new Error('Error'),
        });

        render(
            <BrowserRouter>
                <ForecastContainer city="London" />
            </BrowserRouter>
        );

        expect(screen.getByText('Forecast data could not be loaded.')).toBeInTheDocument();
    });

    it('renders forecast items and navigates on click', async () => {
        (useForecast as any).mockReturnValue({
            data: {
                DailyForecasts: [
                    {
                        Date: '2025-05-06T07:00:00+03:00',
                        Temperature: {
                            Minimum: { Value: 15 },
                            Maximum: { Value: 25 },
                        },
                        Day: {
                            Icon: 2,
                            IconPhrase: 'Sunny',
                        },
                    },
                ],
            },
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <ForecastContainer city="London" />
            </BrowserRouter>
        );

        expect(await screen.findByText(/Sunny/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Sunny/i));
        expect(navigateMock).toHaveBeenCalledWith('/details/0', expect.anything());
    });
});