import PropTypes from 'prop-types';


export default function Button({ text, onClick, disabled = false }) {
    return (
        <button className='default-button' onClick={onClick} disabled={disabled}>{text}</button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}