// ChatContainer.js
import { useLayoutEffect, useRef } from 'react';
import TypingEffectReply from './TypingEffectReply';
import { ChatContainer, MessageWithTime, ChatMessage, ChatTime } from './StyledComponents';

const ChatContainerComponent = ({ chats, chatAnimation, handleTypingEnd, handleTypingStop }) => {
    const chatContainerRef = useRef(null);

    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [chats]);

    return (
        <ChatContainer ref={chatContainerRef}>
            {chats.map((chat, index) => (
                <MessageWithTime key={index}>
                    {chat.isReply ? (
                        <TypingEffectReply chat={chat} onTypingEnd={handleTypingEnd} onTypingStop={handleTypingStop} />
                    ) : (
                        <>
                            <ChatMessage>{chat.text}</ChatMessage>
                            <ChatTime>{chat.time}</ChatTime>
                        </>
                    )}
                </MessageWithTime>
            ))}
        </ChatContainer>
    );
};

export default ChatContainerComponent;