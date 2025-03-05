import { Textarea, Button,Text } from '@mantine/core';
import PropTypes from 'prop-types';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

AnswerBox.propTypes = { label: PropTypes.string.isRequired, placeholder: PropTypes.string,queryContent: PropTypes.string ,setQueryContent: PropTypes.func }
export default function AnswerBox({ label, placeholder = "Input your response here", queryContent, setQueryContent }) {
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        listening,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    const startRecording = async () => {
        setQueryContent(queryContent + " ") // ensure space between current and to be appended content
        resetTranscript();
        await SpeechRecognition.startListening({ continuous: true });
    }

    const stopRecording = async () => {
        await SpeechRecognition.stopListening();
        setQueryContent(queryContent + transcript)
    }

    const handleInputChange = (currContent) => {
        if (!listening) {
            setQueryContent(currContent)
        }
    }

    let displayValue = queryContent
    if (listening) {
        displayValue += transcript
    }

    return (
        <>
        <Textarea className="answer-box"
            label={label}
            description={placeholder }
            value={displayValue}
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            disabled={listening }
            autosize
            minRows={3}
            maxRows={5}
        />
        <Button disabled={!browserSupportsSpeechRecognition || listening} onClick={startRecording} loading={listening} >Record</Button>
        <Button disabled={!browserSupportsSpeechRecognition || !listening} onClick={stopRecording}>Stop</Button>
        {!browserSupportsSpeechRecognition ? <Text>Browser does not support speech recognition</Text> : !isMicrophoneAvailable ? <Text>Allow microphone access to use speech recognition</Text> :null}
        </>

    );

}