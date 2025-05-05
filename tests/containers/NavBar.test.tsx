import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import TopBar from '../../src/components/NavBar.js';
import * as LanguageContext from '../../src/contexts/LanguageContext.js';
import * as ThemeContext from '../../src/contexts/ThemeContext.js';

describe('TopBar component', () => {
    it('renders language selector and theme button', () => {
        vi.spyOn(LanguageContext, 'useLanguage').mockReturnValue({
            lang: 'en',
            setLanguage: vi.fn(),
        });

        vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
            theme: 'light',
            toggleTheme: vi.fn(),
        });

        render(<TopBar />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('🌙 Dark');
    });

    it('calls setLanguage on language change', () => {
        const setLanguageMock = vi.fn();

        vi.spyOn(LanguageContext, 'useLanguage').mockReturnValue({
            lang: 'en',
            setLanguage: setLanguageMock,
        });

        vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
            theme: 'light',
            toggleTheme: vi.fn(),
        });

        render(<TopBar />);
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } });
        expect(setLanguageMock).toHaveBeenCalledWith('es');
    });

    it('calls toggleTheme on theme button click', () => {
        const toggleThemeMock = vi.fn();

        vi.spyOn(LanguageContext, 'useLanguage').mockReturnValue({
            lang: 'en',
            setLanguage: vi.fn(),
        });

        vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
            theme: 'light',
            toggleTheme: toggleThemeMock,
        });

        render(<TopBar />);
        fireEvent.click(screen.getByRole('button'));
        expect(toggleThemeMock).toHaveBeenCalled();
    });
});
