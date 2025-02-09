// ChatInput.jsx
import { useState, useLayoutEffect } from 'react';
import { QuestionInput, InputWrapper } from './StyledComponents';

const ChatInput = ({ inputText, setInputText, inputHeight, setInputHeight, onSendClick }) => {
    const handleChange = (e) => {
        const newHeight = e.target.scrollHeight;
        setInputHeight(newHeight < 168 ? (newHeight > 72 ? newHeight + 20 : 77) : 168);
        setInputText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendClick();
        }
    };

    useLayoutEffect(() => {
        const newHeight = document.getElementById("question").scrollHeight;
        setInputHeight(newHeight < 168 ? (newHeight > 72 ? newHeight + 20 : 77) : 168);
    }, [inputText]);

    return (
        <InputWrapper $inputHeight={inputHeight}>
            <QuestionInput 
                minRows="1"
                maxRows="4"
                id="question" 
                placeholder="라이티에게 궁금한 것을 물어보세요 !" 
                value={inputText}
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
            />
        </InputWrapper>
    );
};

export default ChatInput;