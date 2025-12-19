import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Autocomplete,
    TableFooter
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useCostCode } from "../../context/CostCodeContext";
import { useBudget, type Budget } from "../../context/BudgetContext";

const BudgetTableRow = ({ budgetLine }: { budgetLine: Budget }) => {
    const [num, setNum] = useState(budgetLine?.amount || '');
    const [val, setVal] = useState(budgetLine.costCode);
    const { costCodes } = useCostCode();
    const { deleteBudgetItem, updateBudgetItem } = useBudget();
    return (
        <TableRow>
            <TableCell>
                <Autocomplete
                    value={val}
                    fullWidth
                    options={costCodes.filter(costCode => costCode.length)}
                    noOptionsText="No cost codes available"
                    onChange={(_, newVal) => {
                        setVal(newVal || '');
                        updateBudgetItem({
                            ...budgetLine,
                            costCode: newVal || ''
                        })
                    }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            size="small"
                            fullWidth
                            placeholder="Select"
                            value={budgetLine.costCode}
                        />
                    }
                />
            </TableCell>
            <TableCell>
                <TextField
                    variant="outlined"
                    placeholder="0.00"
                    size="small"
                    fullWidth
                    value={num}
                    type="number"
                    sx={{ input: { textAlign: 'right' } }}
                    onChange={(evt) => setNum(Number(evt.target.value))}
                    onBlur={(evt) => updateBudgetItem({
                        ...budgetLine,
                        amount: Number(evt.target.value)
                    })}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton
                    aria-label="delete"
                    onClick={() => deleteBudgetItem(budgetLine.id)}
                    sx={{
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'grey.50',
                        }
                    }}
                    size="small"
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
};


export const BudgetTable = () => {
    const { budgetList, addBudgetItem, baseTotal } = useBudget();

    useEffect(() => {
        if (budgetList.length === 0) {
            addBudgetItem();
        }
    }, [budgetList, addBudgetItem])

    return (
        <TableContainer sx={{ width: '70%' }}>
            <Table>
                <colgroup>
                    <col style={{ width: '55%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>Cost Codes</TableCell>
                        <TableCell>Budget</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        budgetList.map((budgetLine) =>
                            <BudgetTableRow
                                budgetLine={budgetLine}
                                key={budgetLine.id}
                            />)
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Item total</TableCell>
                        <TableCell sx={{ textAlign: 'right' }} >
                            {`${baseTotal.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}