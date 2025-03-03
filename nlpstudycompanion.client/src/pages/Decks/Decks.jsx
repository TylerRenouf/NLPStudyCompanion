
import DeckTable from './DeckTable';
import { useAllDecks } from '../../services/deckService';



export default function Decks() {
    const { data: decks, isLoading, isError } = useAllDecks();

    if (isError) return <div>Error loading decks</div>;
    if (isLoading) return <div>Loading deck data...</div>

    return  <DeckTable decks={decks} />
}
