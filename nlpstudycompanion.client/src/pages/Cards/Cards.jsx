import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Grid, } from '@mantine/core';
import CardList from './CardList';

import AnswerBox from '../Decks/AnswerBox';
import QueryResult from '../Decks/QueryResult';
import DeckMenu from '../Decks/DeckMenu';

import { useNavbarContent } from '../../utils/NavbarContentContext';

function Cards() {
    const { deckId } = useParams(); 
    const { state } = useLocation();
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const { setNavbarContent } = useNavbarContent();

    useEffect(() => {
        getCards(deckId);

        // Clean up Navbar content when the component is unmounted or deckId changes
        return () => setNavbarContent(null);

    }, [deckId, setNavbarContent]);

    // Update Navbar content after cards are fetched
    useEffect(() => {
        if (!isLoading) {
            setNavbarContent(<DeckMenu cards={cards} setCurrentCard={setCurrentCard} />);
        }
    }, [cards, isLoading, setNavbarContent]);


    let result = null;
    let placeholder = "Feedback will appear here"
    if (isLoading) { return <div>Loading deck: {state}...</div> }

    return (
        <Grid gutter="md" style={{ width: '100%' }}>
           
            <Grid.Col span={{ base: 12, md: 8, lg: 8 }} >
                <Stack>
                    <CardList cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    <AnswerBox label='Your Answer'/>
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                <QueryResult text={result ? result : placeholder} />
            </Grid.Col>
        </Grid>
 
    );

    async function getCards(deckId) {
        const response = await fetch(`https://localhost:7030/api/Deck/${deckId}/cards`);
        const data = await response.json();

        setCards(data);
        setIsLoading(false);
    }
}

export default Cards;