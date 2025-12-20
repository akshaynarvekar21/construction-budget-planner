import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useMemo
} from "react";
import { v4 as uuidv4 } from 'uuid';

export type Budget = {
    id: string;
    costCode: string;
    amount?: number;
}

export type Markup = {
    id?: string;
    costCode: string;
    percent: number;
    appliedIds: string[];
    amount?: number;
}

type BudgetContextType = {
    budgetList: Budget[];
    markups: Markup[];
    baseTotal: number;
    totalMarkupAmount: number;
    grandTotal: number;
    addBudgetItem: () => void;
    updateBudgetItem: (value: Budget) => void;
    deleteBudgetItem: (id: string) => void;
    addMarkup: (markup: Markup) => void;
    deleteMarkUpItem: (id: string) => void;
    updateMarkUpItem: (markup: Markup) => void;
}

const BudgetContext = createContext<BudgetContextType>({
    budgetList: [],
    markups: [],
    baseTotal: 0,
    totalMarkupAmount: 0,
    grandTotal: 0,
    addBudgetItem: () => null,
    deleteBudgetItem: () => null,
    updateBudgetItem: () => null,
    addMarkup: () => null,
    deleteMarkUpItem: () => null,
    updateMarkUpItem: () => null,
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [budgetList, setBudgetList] = useState<Budget[]>([]);
    const [markups, setMarkups] = useState<Markup[]>([]);

    const addBudgetItem = () => setBudgetList([...budgetList, { costCode: '', id: uuidv4() }]);

    const updateBudgetItem = (budget: Budget) => {
        setBudgetList(prev => prev.map((item) =>
            item.id === budget.id ? budget : item
        ));
    };

    const deleteBudgetItem = (id: string) => {
        setBudgetList(prev => prev.filter((item) => item.id !== id));
    };

    const addMarkup = (markup: Markup) => {
        setMarkups(prev => [...prev, { ...markup, id: uuidv4() }]);
    };

    const deleteMarkUpItem = (id: string) => {
        setMarkups(prev => prev.filter(m => m.id !== id));
    }

    const updateMarkUpItem = (markup: Markup) => {
        setMarkups(prev => prev.map((m) => m.id === markup.id ? markup : m));
    }

    const derivedData = useMemo(() => {
        const baseTotal = budgetList.reduce((sum, curr) => sum + (curr.amount || 0), 0);
        const calculatedMarkups: Markup[] = markups.map(m => {
            const subtotal = budgetList
                .filter(b => m.appliedIds.includes(b.id))
                .reduce((sum, curr) => sum + (curr.amount || 0), 0);
            return {
                ...m,
                amount: subtotal * (m.percent / 100)
            };
        });
        const totalMarkupAmount = calculatedMarkups.reduce((sum, m) => sum + (m.amount || 0), 0);

        return {
            baseTotal,
            markups: calculatedMarkups,
            totalMarkupAmount,
            grandTotal: baseTotal + totalMarkupAmount
        };
    }, [budgetList, markups]);

    return (
        <BudgetContext.Provider value={{
            budgetList,
            addBudgetItem,
            deleteBudgetItem,
            updateBudgetItem,
            addMarkup,
            deleteMarkUpItem,
            updateMarkUpItem,
            ...derivedData
        }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = (): BudgetContextType => {
    const context = useContext(BudgetContext);

    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }

    return context;
}