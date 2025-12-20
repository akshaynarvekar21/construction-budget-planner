import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Budget } from './Budget';
import { useBudget } from '../../context/BudgetContext/BudgetContext';

vi.mock('../../context/BudgetContext/BudgetContext', () => ({
    useBudget: vi.fn(),
}));

vi.mock('../../components/BudgetTable/BudgetTable', () => ({
    BudgetTable: () => <div data-testid="mock-budget-table" />,
}));
vi.mock('../../components/MarkupDialog/MarkupDialog', () => ({
    MarkupDialog: ({ open }: { open: boolean }) => open ? <div data-testid="mock-markup-dialog" /> : null,
}));
vi.mock('../../components/MarkupDisplay/MarkupDisplay', () => ({
    MarkupDisplay: () => <div data-testid="mock-markup-display" />,
}));
vi.mock('../../components/GrandTotalDisplay/GrandTotalDisplay', () => ({
    GrandTotalDisplay: () => <div data-testid="mock-grand-total" />,
}));

describe('Budget Component', () => {
    const mockAddBudgetItem = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the main action buttons and budget table', () => {
        vi.mocked(useBudget).mockReturnValue({
            addBudgetItem: mockAddBudgetItem,
            markups: [],
        } as any);

        render(<Budget />);

        expect(screen.getByText(/add budget line/i)).toBeInTheDocument();
        expect(screen.getByText(/add markup/i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-budget-table')).toBeInTheDocument();
    });

    it('calls addBudgetItem when the "Add budget line" button is clicked', () => {
        vi.mocked(useBudget).mockReturnValue({
            addBudgetItem: mockAddBudgetItem,
            markups: [],
        } as any);

        render(<Budget />);

        const addBtn = screen.getByText(/add budget line/i);
        fireEvent.click(addBtn);

        expect(mockAddBudgetItem).toHaveBeenCalledTimes(1);
    });

    it('opens the MarkupDialog when "Add markup" is clicked', () => {
        vi.mocked(useBudget).mockReturnValue({
            addBudgetItem: mockAddBudgetItem,
            markups: [],
        } as any);

        render(<Budget />);

        expect(screen.queryByTestId('mock-markup-dialog')).not.toBeInTheDocument();

        const addMarkupBtn = screen.getByText(/add markup/i);
        fireEvent.click(addMarkupBtn);

        expect(screen.getByTestId('mock-markup-dialog')).toBeInTheDocument();
    });

    it('shows MarkupDisplay and GrandTotal when markups exist', () => {
        vi.mocked(useBudget).mockReturnValue({
            addBudgetItem: mockAddBudgetItem,
            markups: [{ id: '1', name: 'Tax', amount: 10 }],
        } as any);

        render(<Budget />);

        expect(screen.getByTestId('mock-markup-display')).toBeInTheDocument();
        expect(screen.getByTestId('mock-grand-total')).toBeInTheDocument();
    });

    it('hides MarkupDisplay and GrandTotal when no markups exist', () => {
        vi.mocked(useBudget).mockReturnValue({
            addBudgetItem: mockAddBudgetItem,
            markups: [],
        } as any);

        render(<Budget />);

        expect(screen.queryByTestId('mock-markup-display')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mock-grand-total')).not.toBeInTheDocument();
    });
});