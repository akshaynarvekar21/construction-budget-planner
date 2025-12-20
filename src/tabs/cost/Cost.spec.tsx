import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cost } from './Cost';
import { useCostCode } from '../../context/CostCodeContext/CostCodeContext';

vi.mock('../../context/CostCodeContext/CostCodeContext');

vi.mock('../../components/CostCodeTable/CostCodeTable', () => ({
    CostCodeTable: () => <div data-testid="mock-cost-code-table">Table Mock</div>,
}));

describe('Cost Component', () => {
    const mockAddCostCode = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useCostCode).mockReturnValue({
            addCostCode: mockAddCostCode,
            costCodes: [],
            updateCostCode: vi.fn(),
            deleteCostCode: vi.fn(),
        });
    });

    it('renders the "Add cost code" button and the table', () => {
        render(<Cost />);
        expect(screen.getByText(/add cost code/i)).toBeInTheDocument();
        expect(screen.getByTestId('mock-cost-code-table')).toBeInTheDocument();
    });

    it('calls addCostCode when the button is clicked', () => {
        render(<Cost />);
        const addButton = screen.getByRole('button', { name: /add cost code/i });
        fireEvent.click(addButton);
        expect(mockAddCostCode).toHaveBeenCalledTimes(1);
    });
});