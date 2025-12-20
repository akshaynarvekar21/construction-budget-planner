import { type ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BudgetProvider, useBudget, type Markup } from './BudgetContext';

const wrapper = ({ children }: { children: ReactNode }) => (
    <BudgetProvider>{children}</BudgetProvider>
);

describe('BudgetContext', () => {
    it('should add a budget item with a unique ID', () => {
        const { result } = renderHook(() => useBudget(), { wrapper });

        act(() => {
            result.current.addBudgetItem();
        });

        expect(result.current.budgetList).toHaveLength(1);
        expect(result.current.budgetList[0].id).toBeDefined();
        expect(typeof result.current.budgetList[0].id).toBe('string');
    });

    it('should calculate baseTotal correctly', () => {
        const { result } = renderHook(() => useBudget(), { wrapper });

        act(() => {
            result.current.addBudgetItem();
        });

        const id = result.current.budgetList[0].id;

        act(() => {
            result.current.updateBudgetItem({ id, costCode: '101', amount: 500 });
        });

        expect(result.current.baseTotal).toBe(500);
    });

    it('should calculate markups and grandTotal based on appliedIds', () => {
        const { result } = renderHook(() => useBudget(), { wrapper });

        act(() => {
            result.current.addBudgetItem();
        });
        const budgetId = result.current.budgetList[0].id;
        act(() => {
            result.current.updateBudgetItem({ id: budgetId, costCode: '101', amount: 1000 });
        });

        const newMarkup: Markup = {
            costCode: 'TAX',
            percent: 10,
            appliedIds: [budgetId]
        };

        act(() => {
            result.current.addMarkup(newMarkup);
        });

        expect(result.current.markups[0].amount).toBe(100);
        expect(result.current.totalMarkupAmount).toBe(100);
        expect(result.current.grandTotal).toBe(1100);
    });

    it('should update totals when a budget item is deleted', () => {
        const { result } = renderHook(() => useBudget(), { wrapper });

        act(() => {
            result.current.addBudgetItem();
        });

        const newId = result.current.budgetList[0].id;

        act(() => {
            result.current.updateBudgetItem({
                id: newId,
                costCode: '101',
                amount: 100
            });
        });

        expect(result.current.baseTotal).toBe(100);

        act(() => {
            result.current.deleteBudgetItem(newId);
        });

        expect(result.current.baseTotal).toBe(0);
    });
});