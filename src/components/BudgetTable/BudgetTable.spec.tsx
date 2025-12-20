import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetTable } from './BudgetTable';
import { useBudget, useCostCode } from '../../context';

vi.mock('../../context', () => ({
    useBudget: vi.fn(),
    useCostCode: vi.fn(),
}));

describe('BudgetTable', () => {
    const mockAddBudgetItem = vi.fn();
    const mockUpdateBudgetItem = vi.fn();
    const mockDeleteBudgetItem = vi.fn();

    const mockBudgetList = [
        { id: '1', costCode: '10-100', amount: 1000 },
    ];
    const mockCostCodes = ['10-100', '20-200', '30-300'];

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useCostCode).mockReturnValue({
            costCodes: mockCostCodes,
        } as any);

        vi.mocked(useBudget).mockReturnValue({
            budgetList: mockBudgetList,
            addBudgetItem: mockAddBudgetItem,
            updateBudgetItem: mockUpdateBudgetItem,
            deleteBudgetItem: mockDeleteBudgetItem,
            baseTotal: 1000,
        } as any);
    });

    it('renders the table with initial budget items and total', () => {
        render(<BudgetTable />);

        expect(screen.getByDisplayValue('10-100')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    it('calls addBudgetItem if the budget list is empty (useEffect)', () => {
        vi.mocked(useBudget).mockReturnValue({
            budgetList: [],
            addBudgetItem: mockAddBudgetItem,
            baseTotal: 0,
        } as any);

        render(<BudgetTable />);
        expect(mockAddBudgetItem).toHaveBeenCalledTimes(1);
    });

    it('updates cost code when Autocomplete selection changes', async () => {
        render(<BudgetTable />);

        const autocomplete = screen.getByPlaceholderText('Select');
        fireEvent.mouseDown(autocomplete);

        const option = screen.getByText('20-200');
        fireEvent.click(option);

        expect(mockUpdateBudgetItem).toHaveBeenCalledWith(expect.objectContaining({
            id: '1',
            costCode: '20-200'
        }));
    });

    it('disables the amount field if no cost code is selected', () => {
        const emptyBudget = [{ id: '2', costCode: '', amount: 0 }];
        vi.mocked(useBudget).mockReturnValue({
            budgetList: emptyBudget,
            addBudgetItem: mockAddBudgetItem,
            baseTotal: 0,
        } as any);

        render(<BudgetTable />);

        const amountInput = screen.getByPlaceholderText('0.00');
        expect(amountInput).toBeDisabled();
    });

    it('calls updateBudgetItem with new amount on blur', () => {
        render(<BudgetTable />);

        const amountInput = screen.getByPlaceholderText('0.00');

        fireEvent.change(amountInput, { target: { value: '2500' } });
        fireEvent.blur(amountInput);

        expect(mockUpdateBudgetItem).toHaveBeenCalledWith(expect.objectContaining({
            id: '1',
            amount: 2500
        }));
    });

    it('calls deleteBudgetItem when the delete button is clicked', () => {
        render(<BudgetTable />);

        const deleteBtn = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteBtn);

        expect(mockDeleteBudgetItem).toHaveBeenCalledWith('1');
    });
});