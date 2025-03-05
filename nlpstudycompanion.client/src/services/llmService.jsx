import { useMutation } from '@tanstack/react-query';


async function getFeedback(concept, content, answer) {
    const response = await fetch('https://localhost:7030/api/Feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, content, answer }),
    });

    if (!response.ok) throw new Error('Error receiving feedback');
    return await response.json();
}


export function useGetFeedback() {
    return useMutation(({ concept, content, answer }) =>
        getFeedback(concept, content, answer)
    );
}