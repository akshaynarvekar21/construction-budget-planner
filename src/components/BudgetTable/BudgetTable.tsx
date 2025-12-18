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

const BudgetTableRow = ({ budgetLine, ind }: { budgetLine: Budget, ind: number }) => {
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
                        updateBudgetItem(ind, {
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
                    onBlur={(evt) => updateBudgetItem(ind, {
                        ...budgetLine,
                        amount: Number(evt.target.value)
                    })}
                />
            </TableCell>
            <TableCell>
                <IconButton aria-label="delete" onClick={() => deleteBudgetItem(ind)}>
                    <DeleteIcon />
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
        <TableContainer>
            <Table>
                <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '10%' }} />
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
                        budgetList.map((budgetLine, ind) =>
                            <BudgetTableRow
                                budgetLine={budgetLine}
                                key={budgetLine.id}
                                ind={ind}
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