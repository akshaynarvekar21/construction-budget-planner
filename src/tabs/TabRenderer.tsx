import { Container } from "@mui/material";
import { Budget } from "./budget/Budget";
import { Cost } from "./cost/Cost";
import { useTab, TabType } from "../context/TabContext";
import { CostCodeProvider } from "../context/CostCodeContext";
import { BudgetProvider } from "../context/BudgetContext";

export const TabRenderer = () => {
    const { tab } = useTab();

    const getTabContent = (tab: TabType) => {
        switch (tab) {
            case TabType.COST:
                return <Cost />;
            case TabType.BUDGET:
            default:
                return <Budget />;
        }
    };

    return (
        <CostCodeProvider>
            <BudgetProvider>
                <Container sx={{ paddingTop: '48px' }}>
                    {getTabContent(tab)}
                </Container>
            </BudgetProvider>
        </CostCodeProvider>
    )
};