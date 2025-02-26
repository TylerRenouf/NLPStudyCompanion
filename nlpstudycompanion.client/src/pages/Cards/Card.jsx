import { useState } from 'react';
import { Card, Paper,Text } from '@mantine/core';
import PropTypes from 'prop-types';


FlipCard.propTypes = {
    concept: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}


export default function FlipCard({ concept, content }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
        
    }

    const cardProps = {
        shadow: 'sm',
        className: `card ${isFlipped ? 'flipped' : ''}`,
        onClick: flipCard,
        withBorder: true
    }

    return (
        <Card {...cardProps}>
            <Paper shadow="lg" className="card-inner">
                <Text fw={700} size="lg"  className="card-front">
                    {concept}
                </Text>
                <Text className="card-back">
                    {content}
                </Text>
            </Paper>
        </Card>
    );
    

}






