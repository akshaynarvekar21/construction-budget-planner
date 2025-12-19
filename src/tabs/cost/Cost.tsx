import { Box, Button } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { CostCodeTable } from "../../components/CostCodeTable/CostCodeTable";
import { useCostCode } from "../../context/CostCodeContext";

export const Cost = () => {
    const { addCostCode } = useCostCode();
    return (
        <>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => addCostCode()}
                    disableElevation
                >
                    Add cost code
                </Button>
            </Box>
            <CostCodeTable />
        </>
    )
};