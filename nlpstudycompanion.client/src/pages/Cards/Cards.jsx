import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack, Grid, Button} from '@mantine/core';

import CardList from './CardList';
import AnswerBox from '../Decks/AnswerBox';
import QueryResult from '../Decks/QueryResult';
import DeckMenu from '../Decks/DeckMenu';

import { useNavbarContent } from '../../utils/NavbarContentContext';
import { useCardsByDeck } from '../../services/cardsService';
import { useGetFeedback } from '../../services/llmService';

function Cards() {
    const { deckId } = useParams();
    const { state } = useLocation();
    const { setNavbarContent } = useNavbarContent();

    const deckIdAsNumber = Number(deckId);

    const { data: cards, isLoading, isError } = useCardsByDeck(deckIdAsNumber);

    const [currentCard, setCurrentCard] = useState(0)
    const [queryContent, setQueryContent] = useState("")
    const [openAiResponse, setOpenAiResponse] = useState(null)

    const { isError: openAiError, isLoading: openAiLoading, mutateAsync: sendAnswerMutation } = useGetFeedback();


    const handleFeedback = async () => {
        try {
            const response = await sendAnswerMutation({
                concept: cards[currentCard].concept,
                content: cards[currentCard].content,
                answer: queryContent
            })

            setOpenAiResponse(response.feedback)
        }
        catch (error) {
            console.error("Error recieving feedback:", error, openAiError)
            setOpenAiResponse("Error recieving feedback")
        }
    }


    useEffect(() => {
        if (!isLoading) {
            setNavbarContent(<DeckMenu cards={cards} deckId={deckIdAsNumber} setCurrentCard={setCurrentCard} />);
        }
        return () => setNavbarContent(null); // Free navbar content

    }, [cards, isLoading, setNavbarContent, deckIdAsNumber]);



    const placeholder = "Feedback will appear here"

    if (isError) return <div>Error retrieving cards</div>;
    if (isLoading) return <div>Loading deck: {state}...</div>
    

    return (
        <Grid gutter="md" style={{ width: '100%' }}>
           
            <Grid.Col span={{ base: 12, md: 8, lg: 8 }} >
                <Stack>
                    <CardList cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckIdAsNumber} />
                    <AnswerBox label='Your Answer' queryContent={queryContent} setQueryContent={setQueryContent} />
                    <Button onClick={handleFeedback} disabled={openAiLoading} loading={openAiLoading}>Get Feedback</Button>
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                <QueryResult text={openAiResponse || placeholder} />
            </Grid.Col>
        </Grid>
 
    );
}

export default Cards;