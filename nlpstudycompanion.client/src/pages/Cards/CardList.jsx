import PropTypes from 'prop-types';
import FlipCard from './Card';
import { Button, Stack, Group } from '@mantine/core';


CardList.propTypes = {
    cards: PropTypes.array.isRequired,
    currentCard: PropTypes.number.isRequired,
    setCurrentCard: PropTypes.func.isRequired
}

export default function CardList({ cards, currentCard, setCurrentCard }) {

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

    let placeholder_card = <FlipCard key={0} concept={"Create a card to display it here"} content={"This is the back of the card"} />
    

    return (
        <Stack>
            {cardArray.length === 0 ? placeholder_card : cardArray[currentCard]}
            <Group justify='space-between'>
                {/* Buttons for creation and editing of cards */}
                <Group>
                    <Button
                        variant="filled"
                    
                        disabled={currentCard === 0}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="filled"

                        disabled={currentCard === 0}
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