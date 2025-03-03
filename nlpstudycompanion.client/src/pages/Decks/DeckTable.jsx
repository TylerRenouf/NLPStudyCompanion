import PropTypes from 'prop-types';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteDecks, useCreateDeck, useModifyDeck } from '../../services/deckService';

import { useSelectableRows } from '../../utils/hooks/useSelectableRows';
import { useCrudOperations } from '../../utils/hooks/useCrudOperations';

import { Button, Stack, Group, Modal } from '@mantine/core'

import SelectableTable from '../../Components/SelectableTable';
import DeckEditor from './DeckEditor';

DeckTable.propTypes = { decks: PropTypes.array }


export default function DeckTable({ decks }) {
    const navigate = useNavigate();

    const { selectedRows, toggleRowSelection, resetSelection } = useSelectableRows();
    const [opened, { open, close }] = useDisclosure(false);
    const [editingDeckKey, setEditingDeckKey] = useState(null);

    const { mutateAsync: deleteDeckMutation } = useDeleteDecks();
    const { mutateAsync: createDeckMutation } = useCreateDeck();
    const { mutateAsync: modifyDeckMutation } = useModifyDeck();

    const { create, modify, remove } = useCrudOperations({
        createMutation: createDeckMutation,
        modifyMutation: modifyDeckMutation,
        deleteMutation: deleteDeckMutation,
    });
 
    const selectedDecks = decks.reduce((acc, { id, name }) => {
        if (selectedRows.has(id)) {
            acc.push({ id, name });
        }
        return acc;
    }, []);


    const handleRowClick = (row) => {
        const [deckId, deckName] = row;
        navigate(`/deck/${deckId}`, { state: deckName });
    };

    const handleRowSelect = (e, row, rowKey, isSelected) => {
        toggleRowSelection(rowKey, isSelected);
    };

  
    const handleDelete = async () => {
        await remove([...selectedRows]);
        resetSelection();
    };

    function handleDeckAction(deck = null) {
        if (deck) {
            setEditingDeckKey(deck.id);
        } else {
            setEditingDeckKey(null);
        }
        open();
    }

    const handleCreate = async ({name}) => {
        await create({ name })
        close()
    }
    const handleModifyDeck = async ({name}) => {
        await modify({ deckId: editingDeckKey, name })
        close()
    }

    const tableData = {
        caption: 'All Current Decks',
        head: ['Name'],
        body: decks.map((deck) => [deck.id, deck.name]),
    }

    return (
        <Stack>
            <Modal opened={opened} onClose={close} title={editingDeckKey ? "Modify Deck" : "Create Deck"} >
                <DeckEditor
                    name={editingDeckKey ? selectedDecks[0]?.name || "" : ""}
                    onSubmit={editingDeckKey ? handleModifyDeck : handleCreate}
                />
            </Modal>
            <SelectableTable
                tableData={tableData}
                onClick={handleRowClick}
                onSelect={handleRowSelect}
                onDelete={handleDelete}
                selectedRows={[...selectedRows]}
            />
            <Group>
                <Button onClick={() => handleDeckAction(selectedDecks[0])} disabled={selectedDecks.length !== 1}>
                    Edit Deck
                </Button>
                <Button onClick={() => handleDeckAction(null)}>Create New Deck</Button>
            </Group>
        </Stack>
    )

}