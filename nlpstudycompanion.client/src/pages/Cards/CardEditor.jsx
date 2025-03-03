import { Textarea, Stack, Button } from '@mantine/core';
import PropTypes from 'prop-types';
import {useRef, useState } from 'react'

CardEditor.propTypes = { concept: PropTypes.string, content: PropTypes.string, onSubmit: PropTypes.func }
export default function CardEditor({concept, content, onSubmit}) {
    const conceptRef = useRef();
    const contentRef = useRef();
    const [errors, setErrors] = useState({ concept: false, content: false });

    const handleSubmit = () => {
        const concept = conceptRef.current.value.trim();
        const content = contentRef.current.value.trim();
        setErrors({
            concept: !concept,
            content: !content,
        });

        if (!concept || !content) return;

        if (onSubmit) {
            onSubmit({ concept, content }); // Pass values to parent if needed
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target; // Get input name and value
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !value.trim(), // Remove error if user types
        }));
    };

    return (

        <Stack>
            <Textarea label="Concept"
                placeholder="Enter concept"
                name="concept"
                required={true}
                ref={conceptRef}
                defaultValue={concept}
                onChange={(e) => handleChange(e)}
                error={errors.concept ? "Field required" : null}
            />

            <Textarea label="Content"
                placeholder="Enter content"
                name="content"
                required={true}
                defaultValue={content}
                ref={contentRef}
                onChange={(e) => handleChange(e)}
                error={errors.content ? "Field required" : null}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    
    )
}