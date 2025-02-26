import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SelectableTable from '../../Components/SelectableTable';
import { useState } from 'react'

DeckTable.propTypes = { decks: PropTypes.array }


export default function DeckTable({ decks }) {
    const navigate = useNavigate();
    const [selectedRows,setSelectedRows] = useState([])


    const tableData = {
        caption: 'All Current Decks',
        head: ['Name'],
        body: decks.map((deck) =>  [deck.id, deck.name]), 
    }

    const handleRowClick = (row, _) => {
        const deckId = row[0]
        const deckName = row[1]
        navigate(`/deck/${deckId}`, {state: deckName});
    };

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
    )

}