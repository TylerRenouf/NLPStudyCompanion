import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Grid, } from '@mantine/core';

import CardList from './CardList';
import AnswerBox from '../Decks/AnswerBox';
import QueryResult from '../Decks/QueryResult';
import DeckMenu from '../Decks/DeckMenu';

import { useNavbarContent } from '../../utils/NavbarContentContext';
import { useCardsByDeck } from '../../services/cardsService';

function Cards() {
    const { deckId } = useParams(); 
    const { state } = useLocation();
    const { setNavbarContent } = useNavbarContent();
    
    const deckIdAsNumber = Number(deckId);

    const { data: cards, isLoading, isError } = useCardsByDeck(deckIdAsNumber);

    const [currentCard, setCurrentCard] = useState(0)



    useEffect(() => {
        if (!isLoading) {
            setNavbarContent(<DeckMenu cards={cards} deckId={deckIdAsNumber} setCurrentCard={setCurrentCard} />);
        }
        return () => setNavbarContent(null); // Free navbar content

    }, [cards, isLoading, setNavbarContent, deckIdAsNumber]);



    let result = null;


    let placeholder = "Feedback will appear here"

    if (isError) return <div>Error retrieving cards</div>;
    if (isLoading) return <div>Loading deck: {state}...</div>
    

    return (
        <Grid gutter="md" style={{ width: '100%' }}>
           
            <Grid.Col span={{ base: 12, md: 8, lg: 8 }} >
                <Stack>
                    <CardList cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckIdAsNumber} />
                    <AnswerBox label='Your Answer'/>
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                <QueryResult text={result ? result : placeholder} />
            </Grid.Col>
        </Grid>
 
    );
}

export default Cards;