import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { Budget, Cost } from "../tabs";
import { BudgetProvider, CostCodeProvider } from "../context";

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