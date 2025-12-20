import { type ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CostCodeProvider, useCostCode } from './CostCodeContext';

const wrapper = ({ children }: { children: ReactNode }) => (
    <CostCodeProvider>{children}</CostCodeProvider>
);

describe('CostCodeContext', () => {
    it('should initialize with an empty array of cost codes', () => {
        const { result } = renderHook(() => useCostCode(), { wrapper });
        expect(result.current.costCodes).toEqual([]);
    });

    it('should add a new empty cost code when addCostCode is called', () => {
        const { result } = renderHook(() => useCostCode(), { wrapper });

        act(() => {
            result.current.addCostCode();
        });

        expect(result.current.costCodes).toEqual(['']);
    });

    it('should update a specific cost code when updateCostCode is called', () => {
        const { result } = renderHook(() => useCostCode(), { wrapper });

        act(() => {
            result.current.addCostCode();
        });

        act(() => {
            result.current.updateCostCode(0, '10-100');
        });

        expect(result.current.costCodes[0]).toBe('10-100');
    });

    it('should delete a cost code when deleteCostCode is called', () => {
        const { result } = renderHook(() => useCostCode(), { wrapper });

        act(() => {
            result.current.addCostCode();
        });

        act(() => {
            result.current.updateCostCode(0, 'DELETE_ME');
        });

        act(() => {
            result.current.addCostCode();
        });

        act(() => {
            result.current.updateCostCode(1, 'KEEP_ME');
        });

        act(() => {
            result.current.deleteCostCode(0);
        });

        expect(result.current.costCodes).toHaveLength(1);
        expect(result.current.costCodes[0]).toBe('KEEP_ME');
    });
});