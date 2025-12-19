import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useBudget, type Markup } from "../../context/BudgetContext";
import { Delete, Edit } from "@mui/icons-material";


const MarkupDisplayRow = ({ markup, onEdit }: { markup: Markup, onEdit: (m: Markup) => void }) => {
    const { deleteMarkUpItem } = useBudget();
    return (
        <TableRow>
            <TableCell>{markup.costCode}</TableCell>
            <TableCell sx={{ textAlign: 'right' }}>{(markup.amount || 0).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })}</TableCell>
            <TableCell>
                <Box display='flex'>
                    <IconButton aria-label='edit-markup' onClick={() => onEdit(markup)}>
                        <Edit />
                    </IconButton>
                    <IconButton aria-label='delete-markup' onClick={() => deleteMarkUpItem(markup.id || '')}>
                        <Delete />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    )
};

export const MarkupDisplay = ({ onEditMarkup }: { onEditMarkup: (m: Markup) => void }) => {
    const { markups, totalMarkupAmount } = useBudget();

    return (
        <TableContainer>
            <Table>
                <colgroup>
                    <col style={{ width: '55%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>Cost codes</TableCell>
                        <TableCell>Markup amount</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        markups.map(markup => (
                            <MarkupDisplayRow
                                key={markup.id}
                                markup={markup}
                                onEdit={onEditMarkup}
                            />))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Markup total</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>{totalMarkupAmount.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
};