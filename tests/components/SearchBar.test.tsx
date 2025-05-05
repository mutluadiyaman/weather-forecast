import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';

vi.mock('react-i18next', async () => {
    const actual = await vi.importActual('react-i18next');
    return {
        ...actual,
        useTranslation: () => ({
            t: (key: string) => key,
        }),
    };
});

describe('SearchBar', () => {
    it('renders input and button', () => {
        const onSearchMock = vi.fn();
        render(<SearchBar onSearch={onSearchMock} />);

        expect(screen.getByPlaceholderText('search_text')).toBeInTheDocument();
        expect(screen.getByText('search_btn_text')).toBeInTheDocument();
    });

    it('calls onSearch with entered city on submit', async () => {
        const onSearchMock = vi.fn().mockResolvedValue(undefined);

        render(<SearchBar onSearch={onSearchMock} />);

        const input = screen.getByPlaceholderText('search_text');
        fireEvent.change(input, { target: { value: 'Madrid' } });

        fireEvent.click(screen.getByText('search_btn_text'));

        expect(onSearchMock).toHaveBeenCalledWith('Madrid');
    });

    it('does not call onSearch if input is empty', async () => {
        const onSearchMock = vi.fn().mockResolvedValue(undefined);

        render(<SearchBar onSearch={onSearchMock} />);
        fireEvent.click(screen.getByText('search_btn_text'));

        expect(onSearchMock).not.toHaveBeenCalled();
    });
});