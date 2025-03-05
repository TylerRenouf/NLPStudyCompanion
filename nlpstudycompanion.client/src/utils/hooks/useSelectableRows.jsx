import { useState } from 'react';

/*
 Custom hook to manage row selection state
 */
export function useSelectableRows(initialSelected = []) {
    const [selectedRows, setSelectedRows] = useState(new Set(initialSelected));

    const toggleRowSelection = (rowKey, isSelected) => {
        setSelectedRows((prev) => {
            
            const newSelectedRows = new Set(prev);

            if (isSelected) {
                newSelectedRows.add(rowKey);
            } else {
                newSelectedRows.delete(rowKey);
            }
            return newSelectedRows;
        });
    };

    const resetSelection = () => {
        setSelectedRows(new Set());
    };

    return {
        selectedRows,
        toggleRowSelection,
        resetSelection,
    };
}
