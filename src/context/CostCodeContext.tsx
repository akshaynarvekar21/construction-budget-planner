import { createContext, type ReactNode, useState, useContext } from "react";

type CostCodeContextType = {
    costCodes: string[];
    addCostCode: () => void;
    updateCostCode: (ind: number, value: string) => void;
    deleteCostCode: (ind: number) => void;
}

const CostCodeContext = createContext<CostCodeContextType>({
    costCodes: [],
    addCostCode: () => null,
    updateCostCode: () => null,
    deleteCostCode: () => null
});


export const CostCodeProvider = ({ children }: { children: ReactNode }) => {
    const [costCodes, setCostCode] = useState<string[]>([]);

    const addCostCode = () => setCostCode([...costCodes, '']);

    const updateCostCode = (ind: number, value: string) => setCostCode([
        ...costCodes.slice(0, ind),
        value,
        ...costCodes.slice(ind + 1)
    ]);

    const deleteCostCode = (ind: number) => setCostCode([
        ...costCodes.slice(0, ind),
        ...costCodes.slice(ind + 1)
    ]);

    return (
        <CostCodeContext.Provider value={{
            costCodes,
            addCostCode,
            deleteCostCode,
            updateCostCode
        }}>
            {children}
        </CostCodeContext.Provider>);

};

export const useCostCode = (): CostCodeContextType => {
    const context = useContext(CostCodeContext);

    if (!context) {
        throw new Error('useCostCode must be used within a CostCodeProvider');
    }

    return context;
}