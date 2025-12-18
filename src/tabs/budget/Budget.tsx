import { Box, Button } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { BudgetTable } from "../../components/BudgetTable/BudgetTable";
import { useBudget } from "../../context/BudgetContext";
import { MarkupDialog } from "../../components/MarkupDialog/MarkupDialog";
import { useState } from "react";

export const Budget = () => {
    const [open, setOpen] = useState(false);
    const { addBudgetItem } = useBudget()
    return (
        <>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    color="secondary"
                    sx={{ marginRight: '16px' }}
                    onClick={() => addBudgetItem()}
                >
                    Add budget line
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    color="secondary"
                    onClick={() => setOpen(true)}
                >
                    Add markup
                </Button>
            </Box>
            <MarkupDialog open={open} handleClose={() => setOpen(false)} />
            <BudgetTable />
        </>
    )
};
