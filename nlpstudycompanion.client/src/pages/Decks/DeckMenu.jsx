import PropTypes from 'prop-types';
import SelectableTable from '../../Components/SelectableTable';

import { useSelectableRows } from '../../utils/hooks/useSelectableRows';
import { useCrudOperations } from '../../utils/hooks/useCrudOperations';
import { useDeleteCards } from '../../services/cardsService';



DeckMenu.propTypes = { cards: PropTypes.array, deckId: PropTypes.number.isRequired, setCurrentCard: PropTypes.func }

export default function DeckMenu({ cards, deckId, setCurrentCard }) {
    const { selectedRows, toggleRowSelection, resetSelection } = useSelectableRows();
    const { mutateAsync: deleteCardsMutation } = useDeleteCards();

    const { create, modify, remove } = useCrudOperations({
        deleteMutation: deleteCardsMutation,
    });

    

    const handleRowClick = (card, cardIdx) => {
        setCurrentCard(cardIdx)
    }

    const handleRowSelect = (e, row, rowKey, isSelected) => {
        toggleRowSelection(rowKey, isSelected);
    };

    const handleDelete = async () => {
        if (selectedRows.size) {
            await remove({ deckId, cardIds: [...selectedRows] });
            resetSelection();
        }
        
    };


    const tableData = {
        caption: 'Cards in deck',
        head: ['Concept'],
        body: cards.map((card) => [card.id, card.concept]),
    }

    return (
        <SelectableTable
            tableData={tableData}
            onClick={handleRowClick}
            onSelect={handleRowSelect}
            onDelete={handleDelete}
            selectedRows={[...selectedRows]}
        />
    );
}