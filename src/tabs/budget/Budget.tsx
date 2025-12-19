import { Box, Button } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { BudgetTable } from "../../components/BudgetTable/BudgetTable";
import { useBudget, type Markup } from "../../context/BudgetContext";
import { MarkupDialog } from "../../components/MarkupDialog/MarkupDialog";
import { useState } from "react";
import { MarkupDisplay } from "../../components/MarkupDisplay/MarkupDisplay";
import { GrandTotalDisplay } from "../../components/GrandTotalDisplay/GrandTotalDisplay";

export const Budget = () => {
    const { addBudgetItem, markups } = useBudget();

    const [editingMarkup, setEditingMarkup] = useState<Markup | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (markup: Markup) => {
        setEditingMarkup(markup);
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
        setEditingMarkup(null);
    };

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
                    onClick={() => setIsDialogOpen(true)}
                >
                    Add markup
                </Button>
            </Box>
            <MarkupDialog open={isDialogOpen} handleClose={handleClose} markup={editingMarkup} />
            <BudgetTable />
            {
                markups.length !== 0 && (<>
                    <MarkupDisplay onEditMarkup={handleEdit} />
                    <GrandTotalDisplay />
                </>)
            }
        </>
    )
};
