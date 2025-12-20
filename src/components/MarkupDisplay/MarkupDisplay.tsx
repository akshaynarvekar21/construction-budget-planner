import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import { useBudget, type Markup } from "../../context/BudgetContext/BudgetContext";
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
            <TableCell align="right">
                <Box display='flex' justifyContent='end'>
                    <IconButton
                        aria-label='edit-markup'
                        onClick={() => onEdit(markup)}
                        sx={{
                            borderRadius: '4px',
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'transparent',
                            marginRight: '8px',
                            '&:hover': {
                                backgroundColor: 'grey.50',
                            }
                        }}
                        size="small"
                    >
                        <Edit fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        aria-label='delete-markup'
                        onClick={() => deleteMarkUpItem(markup.id || '')}
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
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    )
};

export const MarkupDisplay = ({ onEditMarkup }: { onEditMarkup: (m: Markup) => void }) => {
    const { markups, totalMarkupAmount } = useBudget();

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