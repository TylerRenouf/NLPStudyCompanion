import { Table, Pagination, Stack, Checkbox, Button, Group } from '@mantine/core'

import { useState } from 'react';
import PropTypes from 'prop-types'

SelectableTable.propTypes = { tableData: PropTypes.object, onClick: PropTypes.func, onSelect: PropTypes.func, onDelete: PropTypes.func, selectedRows: PropTypes.array, pageSize: PropTypes.number }
export default function SelectableTable({ tableData, onClick, onSelect,onDelete, selectedRows, pageSize=10 }) {
    const [page, setPage] = useState(1);


    
    const handleRowSelection = (e, row, rowKey, isDisabled) => {
        if (isDisabled !== true) {
            const isSelected = selectedRows.includes(rowKey);
            onSelect(e, row, rowKey, !isSelected);
        }
    };

    const handleDoubleClick = (row, itemIdx, isDisabled) => {
        if (isDisabled !== true) {
            onClick(row, itemIdx);
        }
    };

    function createTableHead(head) {
        const paddedHead = [
            ...Array(2).fill(''), // First 2 columns will always be checkboxes and row numbers
            ...head
        ] 

        return paddedHead.map((item, colIdx) => (
            <Table.Th key={colIdx}>{item}</Table.Th>
        ));
    }

    function createTableBody(body) {
        return body.map((row, rowIdx) => {
            const rowKey = (row[0] === '') ? `empty-${rowIdx}` : row[0];
            const itemIdx = (page - 1) * pageSize + rowIdx

            const checkboxProps = {
                "aria-label": "Select row",
                "checked": selectedRows.includes(rowKey),
                "onChange": (e) => onSelect(e,row, rowKey),
                "readOnly": true,
                "disabled": row[0]===''
            };

            const rowProps = {
                className: 'selectable-row',
                onClick: (e) => handleRowSelection(e, row, rowKey, checkboxProps.disabled),
                onDoubleClick: () => handleDoubleClick(row, itemIdx, checkboxProps.disabled),
            };
  
            return (
                <Table.Tr data-hover key={rowKey} {...rowProps}>
                    <Table.Td key="checkbox">
                        <Checkbox {...checkboxProps} />
                    </Table.Td>
                    {row.map((col, colIdx) => (
                        <Table.Td key={colIdx}>
                            {colIdx === 0 ? itemIdx +1 : col}
                        </Table.Td>
                    ))}
                </Table.Tr>
            );
        });
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = page * pageSize;

    const current_rows = tableData.body.slice(startIdx, endIdx)

    const paddedRows = [
        ...current_rows,
        ...Array(Math.max(0, pageSize - current_rows.length)).fill(
            Array(tableData.head.length+1).fill('') // Fill empty rows accounting for first 2 columns
        ),
    ];

    const rows = createTableBody(paddedRows, onClick, onSelect);
    const tableHeads = createTableHead(tableData.head);
    return (
        <Stack className="deck-table" align='center'>
            <Table withTableBorder withColumnBorders striped captionSide="top" style={{
                overflowY: 'auto', // Allow scrolling within the table if needed
            }}>
                <Table.Caption>{tableData.caption}</Table.Caption>
                <Table.Thead>
                    <Table.Tr >
                        {tableHeads}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
            <Group justify='flex-start'>
            
                <Pagination
                    page={page}
                    onChange={setPage}
                    total={Math.ceil(tableData.body.length / pageSize)}
                />
                <Button color="red" onClick={onDelete} disabled={!selectedRows.length}>Delete Selected</Button>
            </Group>
        </Stack>
    );

}