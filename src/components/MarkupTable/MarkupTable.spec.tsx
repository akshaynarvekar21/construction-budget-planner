import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkupTable } from './MarkupTable';
import { useBudget } from '../../context';

vi.mock('../../context/BudgetContext/BudgetContext', () => ({
    useBudget: vi.fn(),
}));

describe('MarkupTable', () => {
    const mockSetSelectedIds = vi.fn();
    const mockBudgetList = [
        { id: '1', costCode: '10-100', amount: 1000 },
        { id: '2', costCode: '20-200', amount: 2000 },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useBudget).mockReturnValue({
            budgetList: mockBudgetList,
        } as any);
    });

    it('renders the list of budget items with amounts', () => {
        render(
            <MarkupTable
                selectedIds={[]}
                setSelectedIds={mockSetSelectedIds}
                percent={10}
            />
        );

        expect(screen.getByLabelText('10-100')).toBeInTheDocument();
        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
        expect(screen.getByLabelText('20-200')).toBeInTheDocument();
        expect(screen.getByText('$2,000.00')).toBeInTheDocument();
    });

    it('calculates the markup total based on selected items', () => {
        render(
            <MarkupTable
                selectedIds={['1']}
                setSelectedIds={mockSetSelectedIds}
                percent={10}
            />
        );

        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('calls setSelectedIds with a new ID when a row is toggled', () => {
        render(
            <MarkupTable
                selectedIds={['1']}
                setSelectedIds={mockSetSelectedIds}
                percent={10}
            />
        );

        const checkbox = screen.getByLabelText('20-200');
        fireEvent.click(checkbox);

        expect(mockSetSelectedIds).toHaveBeenCalledWith(expect.any(Function));

        const updater = mockSetSelectedIds.mock.calls[0][0];
        expect(updater(['1'])).toEqual(['1', '2']);
    });

    it('selects all items when "Cost codes" header checkbox is clicked', () => {
        render(
            <MarkupTable
                selectedIds={[]}
                setSelectedIds={mockSetSelectedIds}
                percent={10}
            />
        );

        const selectAllCheckbox = screen.getByLabelText('Cost codes');
        fireEvent.click(selectAllCheckbox);

        expect(mockSetSelectedIds).toHaveBeenCalledWith(['1', '2']);
    });

    it('deselects all items if all were previously selected', () => {
        render(
            <MarkupTable
                selectedIds={['1', '2']}
                setSelectedIds={mockSetSelectedIds}
                percent={10}
            />
        );

        const selectAllCheckbox = screen.getByLabelText('Cost codes');
        fireEvent.click(selectAllCheckbox);

        expect(mockSetSelectedIds).toHaveBeenCalledWith([]);
    });
});