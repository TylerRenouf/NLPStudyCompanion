import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchAllDecks() {
    const response = await fetch('https://localhost:7030/api/Deck');
    if (!response.ok) throw new Error('Error fetching decks');
    return await response.json();
}

async function createDeck(name) {
    const response = await fetch('https://localhost:7030/api/Deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Error creating deck');
    return await response.json();
}

async function deleteDeck(deckId) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}`, {
        method: 'DELETE',
    });
    if (response.status === 204) {
        return { deckId }
    }
    if (!response.ok) throw new Error('Error deleting deck');
    return await response.json();
}

async function deleteDecks(deckIds) {
    const response = await fetch(`https://localhost:7030/api/Deck/`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deckIds), 
    });
    if (response.status === 204) {
        return { deckIds }
    }
    if (!response.ok) throw new Error('Error deleting decks');
    return await response.json();
}

async function modifyDeck(deckId, name) {

    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    if (response.status === 204) {
        return {deckId, name}
    }
    if (!response.ok) throw new Error('Error modifying deck');
    return await response.json();
}



export function useAllDecks() {
    return useQuery(['decks'], fetchAllDecks);
}

export function useCreateDeck() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ name }) => createDeck( name ), {
        onSuccess: () => {
            // Invalidate and refetch the decks list to get the latest
            queryClient.invalidateQueries(['decks']);
        },
    });
}

export function useDeleteDeck() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ deckId }) => deleteDeck( deckId ), {
        onSuccess: () => {
            // Refetch the decks list after deletion
            queryClient.invalidateQueries(['decks']);
        },
    });
}
export function useDeleteDecks() {
    const queryClient = useQueryClient();
    return useMutation(
        (deckIds) => deleteDecks(deckIds), {
        onSuccess: () => {
            // Refetch the decks list after deletion
            queryClient.invalidateQueries(['decks']);
        },
    });
}

export function useModifyDeck() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ deckId, name }) => modifyDeck( deckId, name ), {
        onSuccess: () => {
            // Refetch the decks list after modification
            queryClient.invalidateQueries(['decks']);
        },
    });
}