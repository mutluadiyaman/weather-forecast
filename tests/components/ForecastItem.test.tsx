import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ForecastItem from '../../src/components/ForecastItem.js';
import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, fallback: string) => fallback || key,
        i18n: { language: 'en' },
    }),
}));

describe('ForecastItem', () => {
    const sampleDay = {
        Date: '2025-05-06T07:00:00+03:00',
        Temperature: {
            Minimum: { Value: 10 },
            Maximum: { Value: 20 },
        },
        Day: {
            Icon: 6,
            IconPhrase: 'Mostly sunny',
        },
    };

    it('renders day, date, temperatures, icon, and phrase', () => {
        render(<ForecastItem day={sampleDay} />);

        expect(screen.getByText(/Tuesday/i)).toBeInTheDocument(); // Gün adı
        expect(screen.getByText((content) => content.includes('May 6'))).toBeInTheDocument(); // Tarih
        expect(screen.getByAltText(/Mostly sunny/i)).toBeInTheDocument(); // İkon açıklaması
        expect(screen.getByText(/Mostly sunny/i)).toBeInTheDocument(); // Phrase
        expect(screen.getByText(/10°C \/ 20°C/i)).toBeInTheDocument(); // Sıcaklık
    });

    it('calls onClick when card is clicked', () => {
        const onClickMock = vi.fn();
        render(<ForecastItem day={sampleDay} onClick={onClickMock} />);

        fireEvent.click(screen.getByRole('img')); // veya getByText('Mostly sunny')
        expect(onClickMock).toHaveBeenCalled();
    });
});
