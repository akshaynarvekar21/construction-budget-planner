import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useCostCode } from "../../context/CostCodeContext";
import { MarkupTable } from "../MarkupTable/MarkupTable";
import { useState } from "react";
import { useBudget, type Markup } from "../../context/BudgetContext";

export const MarkupDialog = (
    {
        open,
        handleClose,
        markup
    }: {
        open: boolean;
        handleClose: () => void;
        markup?: Markup;
    }) => {
    const { costCodes } = useCostCode();
    const { addMarkup } = useBudget();
    const [selectedCostCode, setSelectedCostCode] = useState(markup?.costCode || '');
    const [percent, setPercent] = useState<number>(markup?.percent || 0);
    const [selectedIds, setSelectedIds] = useState<string[]>(markup?.appliedIds || []);

    const handleSave = () => {
        addMarkup({
            costCode: selectedCostCode,
            percent,
            appliedIds: selectedIds,
        })
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            slotProps={{
                transition: {
                    onExited: () => {
                        setSelectedCostCode('');
                        setPercent(0);
                        setSelectedIds([]);
                    },
                },
            }}
        >
            <DialogTitle>
                Add Markup
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display='flex'>
                    <Box sx={{ marginRight: '16px', width: '65%' }}>
                        <InputLabel id='cost-code-select'>Cost code</InputLabel>
                        <Select
                            fullWidth
                            labelId='cost-code-select'
                            value={selectedCostCode}
                            onChange={(e) => setSelectedCostCode(e.target.value)}
                        >
                            {
                                costCodes.map(costCode =>
                                    <MenuItem key={costCode} value={costCode}>
                                        {costCode}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </Box>
                    <Box>
                        <InputLabel id='perecent'>Percent</InputLabel>
                        <TextField
                            type="number"
                            value={percent}
                            onChange={(e) => setPercent(Number(e.target.value))}
                        />
                    </Box>
                </Box>
                <MarkupTable
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    percent={percent}
                />
            </DialogContent>
            <DialogActions disableSpacing sx={{ px: 3, pb: 2, gap: 2, justifyContent: 'space-between' }}>
                <Button
                    variant='outlined'
                    color='secondary'
                    size='large'
                    fullWidth
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    fullWidth
                    onClick={handleSave}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};