import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../../src/contexts/LanguageContext';
import i18n from '../../src/i18n/index';
import { ReactNode } from 'react';

vi.mock('../../src/i18n', () => ({
    default: {
        changeLanguage: vi.fn(),
    },
}));

describe('LanguageContext', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
        <LanguageProvider>{children}</LanguageProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should default to "en" language', () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });
        expect(result.current.lang).toBe('en');
    });

    it('should change language to "es" and call i18n.changeLanguage', () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });

        act(() => {
            result.current.setLanguage('es');
        });

        expect(result.current.lang).toBe('es');
        expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
    });
});
