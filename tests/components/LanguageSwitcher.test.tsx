import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../../src/components/LanguageSwitcher';
import { LanguageContext } from '../../src/contexts/LanguageContext';

describe('LanguageSwitcher', () => {
    it('renders with default selected language', () => {
        render(
            <LanguageContext.Provider value={{ lang: 'en', setLanguage: vi.fn() }}>
                <LanguageSwitcher />
            </LanguageContext.Provider>
        );

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('en');
    });

    it('calls setLanguage when a different option is selected', () => {
        const mockSetLanguage = vi.fn();
        render(
            <LanguageContext.Provider value={{ lang: 'en', setLanguage: mockSetLanguage }}>
                <LanguageSwitcher />
            </LanguageContext.Provider>
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } });

        expect(mockSetLanguage).toHaveBeenCalledWith('es');
    });
});
