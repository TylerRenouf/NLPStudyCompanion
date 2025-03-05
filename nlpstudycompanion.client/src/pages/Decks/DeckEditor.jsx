import { Button, Textarea, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react'

DeckEditor.propTypes = { name: PropTypes.string ,onSubmit: PropTypes.func }


export default function DeckEditor({ name, onSubmit }) {
    const nameRef = useRef();
    const [errors, setErrors] = useState({ name: false });

    const handleSubmit = () => {
        const name = nameRef.current.value.trim();

        setErrors({
            name: !name,
        });

        if (!name) return;

        if (onSubmit) {
            onSubmit({ name });
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors({
            [name]: !value.trim(),
        });
    };


    return (
        <Stack>
            <Textarea label="Name"
                placeholder="Enter name"
                name="name"
                required={true}
                ref={nameRef}
                defaultValue={name}
                onChange={(e) => handleChange(e)}
                error={errors.name ? "Field required" : null}
            />

            <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}