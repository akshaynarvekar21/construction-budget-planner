import { createContext, type ReactNode, useState, useContext } from 'react';

export enum TabType {
    BUDGET = 'budget',
    COST = 'cost'
}

type TabContextType = {
    tab: TabType;
    setTab: (val: TabType) => void;
}

const TabContext = createContext<TabContextType>({
    tab: TabType.BUDGET,
    setTab: () => null
});


export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [currentTab, setTab] = useState<TabType>(TabType.BUDGET);
    return (
        <TabContext.Provider value={{ tab: currentTab, setTab }}>
            {children}
        </TabContext.Provider>
    )
};

export const useTab = () => {
    const context = useContext(TabContext);

    if (!context) {
        throw new Error('useTab must be used within a TabProvider');
    }

    return context;
}