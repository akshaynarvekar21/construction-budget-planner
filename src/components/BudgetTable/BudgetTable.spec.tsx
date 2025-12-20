import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetTable } from './BudgetTable';
import { useCostCode } from '../../context/CostCodeContext/CostCodeContext';
import { useBudget } from '../../context/BudgetContext/BudgetContext';

vi.mock('../../context/CostCodeContext/CostCodeContext', () => ({
    useCostCode: vi.fn(),
}));
vi.mock('../../context/BudgetContext/BudgetContext', () => ({
    useBudget: vi.fn(),
}));

describe('BudgetTable', () => {
    const mockAddBudgetItem = vi.fn();
    const mockUpdateBudgetItem = vi.fn();
    const mockDeleteBudgetItem = vi.fn();

    const mockBudgetList = [
        { id: '1', costCode: '10-100', amount: 1000 },
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useCostCode).mockReturnValue({
            costCodes: ['10-100', '20-200', '30-300'],
        } as any);

        vi.mocked(useBudget).mockReturnValue({
            budgetList: mockBudgetList,
            addBudgetItem: mockAddBudgetItem,
            updateBudgetItem: mockUpdateBudgetItem,
            deleteBudgetItem: mockDeleteBudgetItem,
            baseTotal: 1000,
        } as any);
    });

    it('renders the table with initial data and total', () => {
        render(<BudgetTable />);

        expect(screen.getByPlaceholderText('0.00')).toHaveValue(1000);
        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    it('updates amount locally on change and calls context on blur', () => {
        render(<BudgetTable />);
        const amountInput = screen.getByPlaceholderText('0.00');

        fireEvent.change(amountInput, { target: { value: '2500' } });
        expect(amountInput).toHaveValue(2500);
        expect(mockUpdateBudgetItem).not.toHaveBeenCalled();

        fireEvent.blur(amountInput);
        expect(mockUpdateBudgetItem).toHaveBeenCalledWith({
            ...mockBudgetList[0],
            amount: 2500
        });
    });

    it('updates cost code using Autocomplete', async () => {
        render(<BudgetTable />);

        const autocompleteInput = screen.getByPlaceholderText('Select');

        fireEvent.mouseDown(autocompleteInput);

        const option = await screen.findByText('20-200');
        fireEvent.click(option);

        expect(mockUpdateBudgetItem).toHaveBeenCalledWith({
            ...mockBudgetList[0],
            costCode: '20-200'
        });
    });

    it('calls deleteBudgetItem when delete button is clicked', () => {
        render(<BudgetTable />);
        const deleteBtn = screen.getByLabelText('delete');

        fireEvent.click(deleteBtn);
        expect(mockDeleteBudgetItem).toHaveBeenCalledWith('1');
    });

    it('automatically adds a line if the list is empty', async () => {
        vi.mocked(useBudget).mockReturnValue({
            budgetList: [],
            addBudgetItem: mockAddBudgetItem,
            baseTotal: 0,
        } as any);

        render(<BudgetTable />);

        await waitFor(() => {
            expect(mockAddBudgetItem).toHaveBeenCalledTimes(1);
        });
    });
});