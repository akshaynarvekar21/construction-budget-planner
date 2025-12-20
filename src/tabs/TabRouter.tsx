import { Container } from "@mui/material";
import { Budget } from "./budget/Budget";
import { Cost } from "./cost/Cost";
import { CostCodeProvider } from "../context/CostCodeContext";
import { BudgetProvider } from "../context/BudgetContext";
import { Routes, Route, Navigate } from "react-router-dom";

export const TabRouter = () => {

    return (
        <CostCodeProvider>
            <BudgetProvider>
                <Container sx={{ paddingTop: '48px' }}>
                    <Routes>
                        <Route path='/budget' element={<Budget />} />
                        <Route path='/cost' element={<Cost />} />
                        <Route path="/" element={<Navigate to="/budget" replace />} />
                    </Routes>
                </Container>
            </BudgetProvider>
        </CostCodeProvider>
    )
};