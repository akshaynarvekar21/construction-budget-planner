import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarkupDialog } from './MarkupDialog';
import { useBudget, useCostCode } from '../../context';

vi.mock('../../context', () => ({
    useBudget: vi.fn(),
    useCostCode: vi.fn(),
}));

describe('MarkupDialog', () => {
    const mockHandleClose = vi.fn();
    const mockAddMarkup = vi.fn();
    const mockUpdateMarkUpItem = vi.fn();

    const mockCostCodes = ['10-100', '20-200'];

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useCostCode).mockReturnValue({
            costCodes: mockCostCodes,
        } as any);

        vi.mocked(useBudget).mockReturnValue({
            addMarkup: mockAddMarkup,
            updateMarkUpItem: mockUpdateMarkUpItem,
            budgetList: [{ id: 'b1', costCode: '10-100', amount: 1000 }],
        } as any);
    });

    it('renders "Add Markup" title when no markup is provided', () => {
        render(<MarkupDialog open={true} handleClose={mockHandleClose} markup={null} />);
        expect(screen.getByText('Add Markup')).toBeInTheDocument();
    });

    it('renders "Edit Markup" and populates fields when markup is provided', () => {
        const existingMarkup = { id: 'm1', costCode: '10-100', percent: 15, appliedIds: ['b1'] };
        render(<MarkupDialog open={true} handleClose={mockHandleClose} markup={existingMarkup} />);

        expect(screen.getByText('Edit Markup')).toBeInTheDocument();
        expect(screen.getByDisplayValue('15')).toBeInTheDocument();
    });

    it('shows validation errors when saving an empty form', () => {
        render(<MarkupDialog open={true} handleClose={mockHandleClose} markup={null} />);

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);

        expect(screen.getByText('Required')).toBeInTheDocument();
        expect(screen.getByText('Must be > 0')).toBeInTheDocument();
        expect(screen.getByText(/Select at least one budget item/i)).toBeInTheDocument();
    });

    it('calls addMarkup and handleClose when form is valid', async () => {
        render(<MarkupDialog open={true} handleClose={mockHandleClose} markup={null} />);

        const selectTrigger = screen.getByRole('combobox', { name: /cost code/i });

        fireEvent.mouseDown(selectTrigger);

        const option = screen.getByRole('option', { name: '10-100' });
        fireEvent.click(option);

        const percentInput = screen.getByPlaceholderText('0');
        fireEvent.change(percentInput, { target: { value: '10' } });

        const checkbox = screen.getByRole('checkbox', { name: '10-100' });
        fireEvent.click(checkbox);

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);

        expect(mockAddMarkup).toHaveBeenCalledWith({
            costCode: '10-100',
            percent: 10,
            appliedIds: ['b1']
        });
    });

    it('calls handleClose when Cancel is clicked', () => {
        render(<MarkupDialog open={true} handleClose={mockHandleClose} markup={null} />);
        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);
        expect(mockHandleClose).toHaveBeenCalled();
    });
});