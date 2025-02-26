async function fetchAllDecks() {
    const response = await fetch('https://localhost:7030/api/Deck');

    const data = await response.json();
    console.log(data);
}

async function createDeck(name) {
    const response = await fetch('https://localhost:7030/api/Deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });
    const data = await response.json();
    console.log(data);
}

async function deleteDeck(deckId) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
}

async function modifyDeck(deckId, name) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });
    const data = await response.json();
    console.log(data);
}



export { fetchAllDecks, createDeck, deleteDeck, modifyDeck }