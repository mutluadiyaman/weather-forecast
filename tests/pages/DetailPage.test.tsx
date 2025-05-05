import { render, screen } from '@testing-library/react';
import DetailPage from '../../src/pages/DetailPage.js';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('should display weather details when state is provided', () => {
    const mockState = {
        Date: '2025-05-05',
        Temperature: { Minimum: { Value: 10 }, Maximum: { Value: 22 } },
        RealFeelTemperature: {
            Minimum: { Value: 8 },
            Maximum: { Value: 20 },
        },
        Day: {
            Icon: 3,
            IconPhrase: 'Partly sunny',
            Wind: {
                Speed: { Value: 15 },
                Direction: { Localized: 'N' },
            },
            RainProbability: 20,
            ThunderstormProbability: 5,
        },
    };

    render(
        <MemoryRouter initialEntries={[{ pathname: '/details/0', state: mockState }]}>
            <Routes>
                <Route path="/details/:id" element={<DetailPage />} />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText(/10°C/)).toBeInTheDocument();
    expect(screen.getByText(/22°C/)).toBeInTheDocument();
    expect(screen.getByText(/15 km\/h N/)).toBeInTheDocument();
});
