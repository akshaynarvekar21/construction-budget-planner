import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CostCodeTable } from './CostCodeTable';
import { useCostCode } from '../../context/CostCodeContext/CostCodeContext';

vi.mock('../../context/CostCodeContext/CostCodeContext', () => ({
    useCostCode: vi.fn(),
}));

describe('CostCodeTable', () => {
    const mockAddCostCode = vi.fn();
    const mockUpdateCostCode = vi.fn();
    const mockDeleteCostCode = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCostCode).mockReturnValue({
            costCodes: ['10-100', '20-200'],
            addCostCode: mockAddCostCode,
            updateCostCode: mockUpdateCostCode,
            deleteCostCode: mockDeleteCostCode,
        });
    });

    it('should call addCostCode on mount if costCodes is empty', async () => {
        vi.mocked(useCostCode).mockReturnValue({
            costCodes: [],
            addCostCode: mockAddCostCode,
            updateCostCode: mockUpdateCostCode,
            deleteCostCode: mockDeleteCostCode,
        });

        render(<CostCodeTable />);

        await waitFor(() => {
            expect(mockAddCostCode).toHaveBeenCalledTimes(1);
        });
    });

    it('should render the correct number of rows', () => {
        render(<CostCodeTable />);
        const rows = screen.getAllByPlaceholderText(/enter cost code/i);
        expect(rows).toHaveLength(2);
        expect(rows[0]).toHaveValue('10-100');
        expect(rows[1]).toHaveValue('20-200');
    });

    it('should update local state on change but only call updateCostCode on blur', () => {
        render(<CostCodeTable />);
        const input = screen.getAllByPlaceholderText(/enter cost code/i)[0];

        fireEvent.change(input, { target: { value: '99-999' } });
        expect(input).toHaveValue('99-999');
        expect(mockUpdateCostCode).not.toHaveBeenCalled();

        fireEvent.blur(input);
        expect(mockUpdateCostCode).toHaveBeenCalledWith(0, '99-999');
    });

    it('should call deleteCostCode when the delete button is clicked', () => {
        render(<CostCodeTable />);
        const deleteButtons = screen.getAllByLabelText(/delete/i);

        fireEvent.click(deleteButtons[1]);
        expect(mockDeleteCostCode).toHaveBeenCalledWith(1);
    });
});