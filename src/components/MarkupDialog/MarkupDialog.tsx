import { useEffect, useState } from "react";
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
import { useBudget, useCostCode, type Markup } from "../../context";
import { MarkupTable } from "../MarkupTable";

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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const isCostCodeInvalid = isSubmitted && !selectedCostCode;
    const isPercentInvalid = isSubmitted && (percent === '' || Number(percent) <= 0);
    const isTableInvalid = isSubmitted && selectedIds.length === 0;

    const handleSave = (evt: React.FormEvent) => {
        evt.preventDefault();
        setIsSubmitted(true);

        if (!selectedCostCode || Number(percent) <= 0 || selectedIds.length === 0) {
            return;
        }

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
            setIsSubmitted(false);
        }
    }, [markup, open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSave,
                },
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
                alignItems: 'end',
                paddingBlock: '24px',
                fontWeight: 600
            }}>
                {markup?.id ? 'Edit Markup' : 'Add Markup'}
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ overflowX: 'hidden' }}>
                <Box display='flex'>
                    <Box sx={{ marginRight: '16px', width: '80%' }}>
                        <InputLabel
                            id='cost-code-select'
                            error={isCostCodeInvalid}
                        >
                            Cost code
                        </InputLabel>
                        <Select
                            size='small'
                            fullWidth
                            labelId='cost-code-select'
                            value={selectedCostCode}
                            error={isCostCodeInvalid}
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
                        {isCostCodeInvalid && <Typography variant="caption" color="error">Required</Typography>}
                    </Box>
                    <Box>
                        <InputLabel
                            id='perecent'
                            error={isPercentInvalid}
                        >
                            Percent
                        </InputLabel>
                        <TextField
                            type="number"
                            value={percent}
                            placeholder="0"
                            size='small'
                            error={isPercentInvalid}
                            helperText={isPercentInvalid ? "Must be > 0" : ""}
                            onChange={(e) => setPercent(Number(e.target.value))}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    border: isTableInvalid ? '1px solid' : 'none',
                    borderColor: 'error.main',
                    borderRadius: 1,
                    mt: isTableInvalid ? 1 : 0,
                    p: isTableInvalid ? 1 : 0
                }}>
                    <MarkupTable
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        percent={Number(percent)}
                    />
                    {isTableInvalid && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                            Select at least one budget item to apply markup
                        </Typography>
                    )}
                </Box>
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