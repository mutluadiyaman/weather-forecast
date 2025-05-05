import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../src/contexts/ThemeContext';
import { ReactNode } from 'react';

describe('useTheme', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
    );

    it('should default to light theme', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.theme).toBe('light');
    });

    it('should toggle theme from light to dark', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');
    });

    it('should persist theme in localStorage', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme(); // dark
        });

        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should initialize theme from localStorage if exists', () => {
        localStorage.setItem('theme', 'dark');

        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.theme).toBe('dark');
    });
});
