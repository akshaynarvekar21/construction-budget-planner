import {
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import { useBudget, type Budget } from "../../context";

const MarkupTableRow = ({ budget, checked, onToggle }: {
    budget: Budget;
    checked: boolean;
    onToggle: () => void;
}) => {
    return (
        <TableRow>
            <TableCell>
                <FormControlLabel
                    label={budget.costCode}
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={onToggle}
                        />}
                />
            </TableCell>
            <TableCell sx={{ textAlign: 'right' }}>
                {budget.amount?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </TableCell>
        </TableRow>
    );
};


export const MarkupTable = ({ selectedIds, setSelectedIds, percent }: {
    selectedIds: string[];
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    percent: number
}) => {
    const { budgetList } = useBudget();

    const selectedSubtotal = budgetList
        .filter(b => selectedIds.includes(b.id))
        .reduce((sum, curr) => sum + (curr.amount || 0), 0);

    const markupAmount = selectedSubtotal * (percent / 100);

    const handleToggleRow = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if (selectedIds.length === budgetList.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(budgetList.map(b => b.id));
        }
    };

    const isAllSelected = budgetList.length > 0 && selectedIds.length === budgetList.length;
    const isSomeSelected = selectedIds.length > 0 && selectedIds.length < budgetList.length;

    return (
        <TableContainer>
            <Table>
                <colgroup>
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '30%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <FormControlLabel
                                label='Cost codes'
                                slotProps={{
                                    typography: { sx: { fontWeight: 600 } }
                                }}
                                control={
                                    <Checkbox
                                        checked={isAllSelected}
                                        indeterminate={isSomeSelected}
                                        onChange={handleToggleAll}
                                    />}
                            />
                        </TableCell>
                        <TableCell>Budget</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        budgetList
                            .filter(budget => budget.amount && budget.costCode.length)
                            .map((budget) => (
                                <MarkupTableRow
                                    key={budget.id}
                                    budget={budget}
                                    checked={selectedIds.includes(budget.id)}
                                    onToggle={() => handleToggleRow(budget.id)}
                                />
                            ))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Markup total</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                            {markupAmount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};