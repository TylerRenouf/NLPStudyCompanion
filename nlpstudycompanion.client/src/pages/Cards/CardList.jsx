import PropTypes from 'prop-types';
import FlipCard from './Card';
import { Button, Stack, Group, Modal } from '@mantine/core';
import CardEditor from './CardEditor';
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useCreateCard, useModifyCard } from '../../services/cardsService';
CardList.propTypes
 = {
    cards: PropTypes.array.isRequired,
    currentCard: PropTypes.number.isRequired,
    setCurrentCard: PropTypes.func.isRequired,
    deckId: PropTypes.number.isRequired
}

export default function CardList({ cards, currentCard, setCurrentCard, deckId }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [editingCardIndex, setEditingCardIndex] = useState(null);
    const { mutateAsync: createCardMutation } = useCreateCard();
    const { mutateAsync: modifyCardMutation } = useModifyCard();


    let cardArray = cards.map((card) => (
        <FlipCard key={card.id} concept={card.concept} content={card.content} />
    ))

    function getNextCard() {
        let nextIdx = Math.min(currentCard + 1, cardArray.length - 1);
        setCurrentCard(nextIdx);
    }

    function getPreviousCard() {
        let prevIdx = Math.max(currentCard - 1, 0);
        setCurrentCard(prevIdx);
    }

    function editCard(index=null) {
        setEditingCardIndex(index);
        open();
    }

    async function handleCardCreate({ concept, content }) {
        await createCardMutation({ deckId, concept, content })
        close();

    }
    async function handleCardModify({ concept, content }) {
        const cardId = cards[currentCard].id
        if (cards[currentCard].concept === concept && cards[currentCard].content === content) {
            return
        }
        await modifyCardMutation({ cardId, deckId, concept, content })
        close();
    }

    let placeholder_card = <FlipCard key={0} concept={"Create a card to display it here"} content={"This is the back of the card"} />
    

    return (
        <Stack>
            <Modal opened={opened} onClose={close} title={editingCardIndex === null ? "Create Card" : "Modify Card"}>
                <CardEditor
                    concept={editingCardIndex !== null ? cards[editingCardIndex]?.concept || "" : ""}
                    content={editingCardIndex !== null ? cards[editingCardIndex]?.content || "" : ""}
                    onSubmit={editingCardIndex !== null ? handleCardModify : handleCardCreate }
                />
            </Modal>
            {cardArray.length === 0 ? placeholder_card : cardArray[currentCard]}
            <Group justify='space-between'>
                {/* Buttons for creation and editing of cards */}
                <Group>
                    <Button
                        variant="filled"
                        onClick={() => editCard(currentCard)}
                        disabled={cardArray.length === 0}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="filled"
                        onClick={() => editCard(null)}
                    >
                        Create
                    </Button>
                </Group>

                {/* Buttons for next and previous selection */}
                <Group>
                    <Button
                        variant="filled"
                        onClick={getPreviousCard}
                        disabled={currentCard === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="filled"
                        onClick={getNextCard}
                        disabled={currentCard === cardArray.length - 1}
                    >
                        Next
                    </Button>
                </Group>
            </Group>
            
            </Stack>
    );
}