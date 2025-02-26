import { useEffect, useState } from 'react';
import DeckTable from './DeckTable';



export default function Decks() {
    const [decks, setDecks] = useState(null);


    useEffect(() => {
        populateDeckData();
    }, []);




    return (
        decks===null ? <div>Loading deck data...</div> : 
         <DeckTable decks={decks} />
    );

    async function populateDeckData() {
        const response = await fetch('https://localhost:7030/api/Deck');

        const data = await response.json();

        setDecks(data);
    }

}
