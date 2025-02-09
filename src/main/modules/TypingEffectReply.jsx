// TypingEffectReply.jsx
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { MessageWithTime, ReplyMessage, ReplyTime, StopTypingButton } from './StyledComponents';

const TypingEffectReply = ({ chat, onTypingEnd, onTypingStop }) => {
    const [typedText, setTypedText] = useState(""); // 타이핑 중인 텍스트
    const [index, setIndex] = useState(0); // 타이핑할 위치
    const typingSpeed = 50; // 타이핑 속도 (ms)
    const chatAnimation = Cookies.get('chatAnimation') === 'true'; // 쿠키에서 chatAnimation 값 가져옴
    const [isTyped, setIsTyped] = useState(false); // 이미 텍스트가 타이핑되었는지 확인하는 상태

    useEffect(() => {
        if (chatAnimation && !isTyped) {
            if (index < chat.text.length) {
                const timeoutId = setTimeout(() => {
                    setTypedText((prev) => prev + chat.text.slice(index, index + 7)); // 7글자씩 추가
                    setIndex(index + 7); // 인덱스를 7씩 증가
                }, typingSpeed);

                return () => clearTimeout(timeoutId);
            } else if (onTypingEnd) {
                setIsTyped(true);
                onTypingEnd();
            }
        } else if (!chatAnimation && !isTyped) {
            setTypedText(chat.text);
            setIsTyped(true);
            if (onTypingEnd) {
                onTypingEnd();
            }
        }
    }, [index, chat.text, onTypingEnd, chatAnimation, isTyped]);

    const handleStopTyping = () => {
        setIsTyped(true); // 타이핑 완료 상태로 변경
        if (onTypingStop) onTypingStop(); // 중단 시 콜백 호출
    };

    return (
        <>
            <MessageWithTime>
                <ReplyMessage>{typedText}</ReplyMessage>
                <ReplyTime>{chat.time}</ReplyTime>
            </MessageWithTime>
            {chatAnimation && !isTyped && (
                <StopTypingButton onClick={handleStopTyping}>■</StopTypingButton>
            )}
        </>
    );
};

export default TypingEffectReply;