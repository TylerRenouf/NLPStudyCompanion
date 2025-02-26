import { Textarea } from '@mantine/core';
import PropTypes from 'prop-types';

AnswerBox.propTypes = { label: PropTypes.string.isRequired, placeholder: PropTypes.string }
export default function AnswerBox({ label, placeholder = "Input response here" }) {

    return (
        <Textarea
            label={label}
            placeholder={placeholder}
            autosize
            minRows={3}
            maxRows={5}
        />
    );

}