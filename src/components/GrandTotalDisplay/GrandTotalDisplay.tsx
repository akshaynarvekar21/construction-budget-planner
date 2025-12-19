import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useBudget } from "../../context/BudgetContext";


export const GrandTotalDisplay = () => {
    const { grandTotal } = useBudget();
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
                        <TableCell>Grand Total</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>{grandTotal.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    )
}