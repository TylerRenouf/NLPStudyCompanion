import PropTypes from 'prop-types';
import SelectableTable from '../../Components/SelectableTable';
import { useState } from 'react'

DeckMenu.propTypes = { cards: PropTypes.array, setCurrentCard: PropTypes.func }

export default function DeckMenu({ cards, setCurrentCard }) {
    const [selectedRows, setSelectedRows] = useState([])


    const tableData = {
        caption: 'Cards in deck',
        head: ['Concept'],
        body: cards.map((card) => [card.id, card.concept]),
    }

    const handleRowClick = (card, cardIdx) => {
        setCurrentCard(cardIdx) // Set current index based on row index in table (is 1-indexed)
    }

    const handleRowSelect = (e, row, rowKey, isSelected) => {
        setSelectedRows((prevSelectedRows) => {
            if (isSelected) {
                return [...prevSelectedRows, rowKey];
            } else {
                return prevSelectedRows.filter((key) => key !== rowKey);
            }
        });
    }


    return (
        <SelectableTable tableData={tableData} onClick={handleRowClick} onSelect={handleRowSelect} selectedRows={selectedRows} />
    );
}