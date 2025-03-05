import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


async function fetchCardsByDeck(deckId) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}/cards`, {
            method: 'GET'
    });
    if (!response.ok) throw new Error('Error fetching cards')
    return await response.json()
}

async function createCard(deckId, concept, content) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept: concept, content: content })
    });
    if (!response.ok) throw new Error('Error creating card')
    return await response.json()
}

async function deleteCard(deckId, cardId) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}/cards/${cardId}`, {
        method: 'DELETE',
    });

    if (response.status === 204) {
        return { deckId };
    }

    if (!response.ok) {
        throw new Error('Error deleting card');
    }

    return await response.json();
}

export async function deleteCards(deckId, cardIds) {
    return fetch(`https://localhost:7030/api/Deck/${deckId}/cards`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardIds), 
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to delete cards");
    });
}

async function modifyCard(deckId, cardId, concept, content) {
    const response = await fetch(`https://localhost:7030/api/Deck/${deckId}/cards/${cardId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept:concept, content:content, deckId: deckId })
    });

    if (response.status === 204) {
        return { deckId, cardId };
    }
    if (!response.ok) throw new Error('Error updating card')

    return await response.json()
}

export function useCardsByDeck(deckId) {
    return useQuery(
        ['cards', deckId],
        () => fetchCardsByDeck(deckId),
        {
            enabled: !!deckId,
        }
    );
}

export function useCreateCard() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ deckId, concept, content }) => createCard(deckId, concept, content), {
        onSuccess: (_, { deckId }) => {
            // Refetch cards to get created
            queryClient.invalidateQueries(['cards', deckId])

        }
    });
}

export function useDeleteCard() {
    const queryClient = useQueryClient();

    return useMutation(
        ({ deckId, cardId }) => deleteCard(deckId, cardId),
        {
            onSuccess: (_, { deckId }) => {
                // Refetch the cards list after deletion
                queryClient.invalidateQueries(['cards', deckId]);
            },
            onError: (error) => {
                console.error('Error deleting card:', error);
            },
        }
    );
}

export function useDeleteCards() {
    const queryClient = useQueryClient();

    return useMutation(
        ({ deckId, cardIds }) => deleteCards(deckId, cardIds), // Pass multiple IDs
        {
            onSuccess: (_, { deckId }) => {
                queryClient.invalidateQueries(['cards', deckId]); // Refresh cards
            },
            onError: (error) => {
                console.error('Error deleting cards:', error);
            },
        }
    );
}

export function useModifyCard() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ deckId, cardId, concept, content }) => modifyCard(deckId, cardId, concept, content), {
        onSuccess: (_,{ deckId }) => {
                // Refetch the decks list after modification
                queryClient.invalidateQueries(['cards', deckId]);
            },
            onError: (error) => {
                console.error('Error modifying card:', error);
            },
    });
}
