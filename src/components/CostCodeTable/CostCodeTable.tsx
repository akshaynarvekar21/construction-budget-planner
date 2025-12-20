import { useEffect, useState } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCostCode } from "../../context/CostCodeContext/CostCodeContext";

const CostCodeTableRow = ({ costCode = '', index }: { costCode?: string; index: number }) => {
    const [text, setText] = useState<string>(costCode);
    const { deleteCostCode, updateCostCode } = useCostCode();
    return (
        <TableRow>
            <TableCell>
                <TextField
                    variant="outlined"
                    placeholder="Enter cost code"
                    size="small"
                    sx={{
                        width: '70%'
                    }}
                    value={text}
                    onChange={(evt) => {
                        setText(evt.target.value);
                    }}
                    onBlur={(evt) => {
                        updateCostCode(index, evt.target.value);
                    }}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton
                    aria-label="delete"
                    onClick={() => deleteCostCode(index)}
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


export const CostCodeTable = () => {
    const { costCodes, addCostCode } = useCostCode();

    useEffect(() => {
        if (costCodes.length === 0) {
            addCostCode();
        }
    }, [costCodes, addCostCode]);

    return (
        <TableContainer sx={{ width: '70%' }}>
            <Table>
                <colgroup>
                    <col style={{ width: '85%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>Cost Codes</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        costCodes.map((costCode, ind) => <CostCodeTableRow key={ind + costCode} costCode={costCode} index={ind} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};