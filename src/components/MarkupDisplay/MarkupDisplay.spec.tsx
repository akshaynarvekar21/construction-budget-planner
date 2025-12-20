import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkupDisplay } from './MarkupDisplay';
import { useBudget } from '../../context';

vi.mock('../../context/BudgetContext/BudgetContext', () => ({
    useBudget: vi.fn(),
}));

describe('MarkupDisplay', () => {
    const mockOnEditMarkup = vi.fn();
    const mockDeleteMarkUpItem = vi.fn();

    const mockMarkups = [
        { id: 'm1', costCode: 'TAX-01', percent: 10, appliedIds: ['1'], amount: 150.50 },
        { id: 'm2', costCode: 'FEES-02', percent: 5, appliedIds: ['1', '2'], amount: 75.00 },
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useBudget).mockReturnValue({
            markups: mockMarkups,
            totalMarkupAmount: 225.50,
            deleteMarkUpItem: mockDeleteMarkUpItem,
            budgetList: [],
            baseTotal: 0,
            grandTotal: 225.50,
            addBudgetItem: vi.fn(),
            updateBudgetItem: vi.fn(),
            deleteBudgetItem: vi.fn(),
            addMarkup: vi.fn(),
            updateMarkUpItem: vi.fn(),
        });
    });

    it('renders all markup rows with formatted currency', () => {
        render(<MarkupDisplay onEditMarkup={mockOnEditMarkup} />);

        expect(screen.getByText('TAX-01')).toBeInTheDocument();
        expect(screen.getByText('FEES-02')).toBeInTheDocument();

        expect(screen.getByText('$150.50')).toBeInTheDocument();
        expect(screen.getByText('$75.00')).toBeInTheDocument();
    });

    it('triggers onEditMarkup when the edit icon is clicked', () => {
        render(<MarkupDisplay onEditMarkup={mockOnEditMarkup} />);

        const editButtons = screen.getAllByLabelText('edit-markup');
        fireEvent.click(editButtons[0]);

        expect(mockOnEditMarkup).toHaveBeenCalledWith(mockMarkups[0]);
    });

    it('triggers deleteMarkUpItem from context with correct ID', () => {
        render(<MarkupDisplay onEditMarkup={mockOnEditMarkup} />);

        const deleteButtons = screen.getAllByLabelText('delete-markup');
        fireEvent.click(deleteButtons[1]);

        expect(mockDeleteMarkUpItem).toHaveBeenCalledWith('m2');
    });

    it('displays the total markup amount in the footer', () => {
        render(<MarkupDisplay onEditMarkup={mockOnEditMarkup} />);

        const footerTotal = screen.getByText('$225.50');
        expect(footerTotal).toBeInTheDocument();

        expect(footerTotal.closest('td')).toHaveStyle('text-align: right');
    });
});