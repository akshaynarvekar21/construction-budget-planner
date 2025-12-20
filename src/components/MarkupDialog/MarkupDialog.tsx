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
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useCostCode } from "../../context/CostCodeContext/CostCodeContext";
import { MarkupTable } from "../MarkupTable/MarkupTable";
import { useEffect, useState } from "react";
import { useBudget, type Markup } from "../../context/BudgetContext/BudgetContext";

export const MarkupDialog = (
    {
        open,
        handleClose,
        markup
    }: {
        open: boolean;
        handleClose: () => void;
        markup: Markup | null;
    }) => {
    const { costCodes } = useCostCode();
    const { addMarkup, updateMarkUpItem } = useBudget();
    const [selectedCostCode, setSelectedCostCode] = useState('');
    const [percent, setPercent] = useState<number | string>('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSave = () => {
        if (markup?.id) {
            updateMarkUpItem({
                id: markup.id,
                costCode: selectedCostCode,
                percent: Number(percent),
                appliedIds: selectedIds,
            })
        } else {
            addMarkup({
                costCode: selectedCostCode,
                percent: Number(percent),
                appliedIds: selectedIds,
            })
        }
        handleClose();
    };

    useEffect(() => {
        if (open) {
            setSelectedCostCode(markup?.costCode || '');
            setPercent(markup?.percent || '');
            setSelectedIds(markup?.appliedIds || []);
        }
    }, [markup, open]);

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
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBlock: '24px'
            }}>
                <Typography sx={{ fontWeight: 600, paddingBlock: '9px' }} variant='h5'>
                    Add Markup
                </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ overflowX: 'hidden' }}>
                <Box display='flex'>
                    <Box sx={{ marginRight: '16px', width: '80%' }}>
                        <InputLabel id='cost-code-select'>Cost code</InputLabel>
                        <Select
                            size='small'
                            fullWidth
                            labelId='cost-code-select'
                            value={selectedCostCode}
                            onChange={(e) => setSelectedCostCode(e.target.value)}
                        >
                            {
                                costCodes
                                    .filter(costCode => costCode.length)
                                    .map(costCode =>
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
                            placeholder="0"
                            size='small'
                            onChange={(e) => setPercent(Number(e.target.value))}
                        />
                    </Box>
                </Box>
                <MarkupTable
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    percent={Number(percent)}
                />
            </DialogContent>
            <DialogActions disableSpacing sx={{ px: 3, pb: 2, pt: '48px', gap: 2, justifyContent: 'space-between' }}>
                <Button
                    variant='outlined'
                    size='large'
                    fullWidth
                    onClick={handleClose}
                    disableElevation
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    size='large'
                    fullWidth
                    onClick={handleSave}
                    disableElevation
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
};