import { Paper, Text } from '@mantine/core';
import PropTypes from 'prop-types';

QueryResult.propTypes = { text: PropTypes.string.isRequired }
export default function QueryResult({ text }) {
    const paperProps = { shadow: 'sm', p: 'md', style: { height: '100%' }, className: 'query-result' }
    const textProps = { align: 'left', style: { whiteSpace: 'pre-wrap' }, fw: 350 }

    return (
        <Paper {...paperProps}>
            <Text {...textProps}>
                {text}
            </Text>
        </Paper>
    );

}