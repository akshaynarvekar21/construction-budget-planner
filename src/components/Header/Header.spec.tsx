import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../../theme/theme';
import { Header } from './Header';

const renderHeader = () => render(
    <ThemeProvider theme={customTheme} defaultMode="light" noSsr>
        <MemoryRouter initialEntries={['/budget']}>
            <Header />
        </MemoryRouter>
    </ThemeProvider>
);

describe('Header Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the title and the dark mode toggle', () => {
        renderHeader();
        expect(screen.getByText('1234 Main Street')).toBeInTheDocument();
        expect(screen.getByLabelText(/toggle dark mode/i)).not.toBeChecked();
    });

    it('switches between light and dark mode when the toggle is clicked', () => {
        renderHeader();
        const toggle = screen.getByLabelText(/toggle dark mode/i);

        fireEvent.click(toggle);
        expect(toggle).toBeChecked();
        expect(document.documentElement).toHaveClass('dark');

        fireEvent.click(toggle);
        expect(toggle).not.toBeChecked();
        expect(document.documentElement).toHaveClass('light');
    });
});
