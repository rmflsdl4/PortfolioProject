//Body.jsx
import React, { useState, useEffect} from 'react';
import styled, { keyframes } from "styled-components";
import { 
    MainImg,
    LangImg,
    MenuImg,
    KrenImg,
    SendImg
} from './ImageComponents';
import TextareaAutosize from 'react-textarea-autosize';
import Cookies from 'js-cookie';
import BodyLogic from './BodyLogic';

// 스타일 컴포넌트
const HeaderWrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
    height: 120px;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0px 5px 5px gray;
    z-index: 998;
`;

const LangContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: 50px;
    transform: translate(0, -50%);
`;

const BodyBg = styled.div`
    background-color: #EBF1EE;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const BottomWrap = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-color: #EBF1EE;
    position: fixed;
`;

const InputWrapper = styled.div`
    width: 862px;
    height: ${({ $inputHeight }) => $inputHeight}px;
    border: 2px solid #004e2b;
    border-radius: 20px;
    bottom: 42px;
    position: absolute;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 50%;
    transform: translateX(-50%);
`;

const QuestionInput = styled(TextareaAutosize)`
    width: 700px;
    margin-left: 39px;
    font-size: 27px;
    border: 0;
    resize: none;
    font-family: 'Kanit', sans-serif;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #000000;
        opacity: 20%;
    }

    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
        cursor: default;
    }

    &::-webkit-scrollbar-thumb {
        outline: none;
        border-radius: 10px;
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.5);
        cursor: default;
    }

    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
        cursor: default;
    }

    &::-webkit-scrollbar-track {
        box-shadow: none;
        background-color: transparent;
        cursor: default;
    }
`;

const ChatContainer = styled.div`
    position: absolute;
    top: 120px;
    bottom: ${({ $inputHeight }) => $inputHeight + 46}px;
    width: 100%;
    overflow-y: scroll;
    padding: 14px 0;
    background-color: #EBF1EE;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    &::-webkit-scrollbar-thumb {
        outline: none;
        border-radius: 10px;
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.5);
    }

    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
    }

    &::-webkit-scrollbar-track {
        box-shadow: none;
        background-color: transparent;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:start:increment {
        display: block;
        height: 4px;
    }
`;

const ChatMessage = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-family: 'Kanit', sans-serif;
    border: 1px solid #004E2B;
    background-color: #CCE8CE;
    margin: 16px 0 0 auto;
    border-radius: 20px;
    word-wrap: break-word;
    white-space: pre-wrap;
    max-width: 65%;
`;

const ChatTime = styled.div`
    font-size: 15px;
    font-family: 'Kanit', sans-serif;
    color: #000000;
    margin: 10px 0 0 0; 
    align-self: flex-end;
`;

const MessageWithTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 860px;
`;

const ReplyMessage = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-family: 'Kanit', sans-serif;
    border: 1px solid #004E2B;
    background-color: #ffffff;
    margin: 16px 0 0 10px;
    border-radius: 20px;
    word-wrap: break-word;
    white-space: pre-wrap;
    min-height: 27px;
    max-width: 65%;
    align-self: flex-start;
`;

const ReplyTime = styled.div`
    font-size: 15px;
    font-family: 'Kanit', sans-serif;
    color: #000000;
    margin: 10px 0 0 10px; 
    align-self: flex-start;
`;

const ScrollToBottomButton = styled.button`
    width: 36px;
    height: 36px;
    position: fixed;
    bottom: 140px;
    right: 50%;
    background-color: #ffffff;
    color: #004e2b;
    border: 1px #004e2b solid;
    border-radius: 50%;
    padding: 0px;
    cursor: pointer;
    font-size: 18px;
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

const StopTypingButton = styled.button`
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 58px;
    left: 50%;
    transform: translateX(920%);
    padding: 0 0 6px 0;
    font-size: 30px;
    color: #004e2b;
    background-color: #ffffff;
    border: 1px #004e2b solid;
    border-radius: 50%;
    cursor: pointer;
    z-index: 900;
`;

// 애니메이션 키프레임 정의
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const AnimatedChar = styled.span`
    display: inline-block;
    animation: ${({ $selectedStyle }) => ($selectedStyle === "1" ? fadeIn : "none")} 0.2s ease-in;
    animation-delay: 0ms;
    opacity: ${({ $selectedStyle }) => ($selectedStyle === "1" ? "0" : "1")};
    animation-fill-mode: forwards;
`;

// 타이핑 효과를 위한 컴포넌트
const TypingEffectReply = ({ chat, onTypingEnd, onTypingStop }) => {
    const [typedText, setTypedText] = useState(""); // 타이핑 중인 텍스트
    const [index, setIndex] = useState(0); // 타이핑할 위치
    const typingSpeed = 50; // 타이핑 속도 (ms)
    const chatAnimation = Cookies.get('chatAnimation') === 'true'; // 쿠키에서 chatAnimation 값 가져옴
    const selectedStyle = Cookies.get('selectedStyle'); // 쿠키에서 selectedStyle 값 가져옴
    const [isTyped, setIsTyped] = useState(false); // 이미 텍스트가 타이핑되었는지 확인하는 상태
    const [finalMessage, setFinalMessage] = useState(null); // 최종 출력 메시지를 저장

    useEffect(() => {
        if (chatAnimation && !isTyped) {
            if (index < chat.text.length) {
                const timeoutId = setTimeout(() => {
                    setTypedText((prev) => prev + chat.text.slice(index, index + 3)); // 3글자씩 추가
                    setIndex(index + 3);
                }, typingSpeed);

                return () => clearTimeout(timeoutId);
            } else {
                setIsTyped(true); // 타이핑 완료 상태로 설정
                setFinalMessage(
                    <ReplyMessage>
                        {typedText.split("").map((char, idx) => (
                            <AnimatedChar key={idx} $selectedStyle={selectedStyle}>
                                {char}
                            </AnimatedChar>
                        ))}
                    </ReplyMessage>
                );
                if (onTypingEnd) onTypingEnd();
            }
        } else if (!chatAnimation && !isTyped) {    // 애니메이션을 껐을 경우
            setIsTyped(true);
            setFinalMessage(<ReplyMessage>{chat.text}</ReplyMessage>);
            if (onTypingEnd) onTypingEnd();
        }

    }, [index, chat.text, onTypingEnd, chatAnimation, isTyped, typedText, selectedStyle]);

    // 타이핑 중단 처리
    const handleStopTyping = () => {
        setIsTyped(true); // 타이핑 완료 상태로 변경
        if (onTypingStop) onTypingStop(); // 중단 시 콜백 호출
    };

    return (
        <>
            <MessageWithTime>
                {finalMessage || (
                    <ReplyMessage>
                        {typedText.split("").map((char, idx) => (
                            <AnimatedChar key={idx} $selectedStyle={selectedStyle}>
                                {char}
                            </AnimatedChar>
                        ))}
                    </ReplyMessage>
                )}
                <ReplyTime>{chat.time}</ReplyTime>
            </MessageWithTime>
            {chatAnimation && !isTyped && (
                <StopTypingButton onClick={handleStopTyping}>■</StopTypingButton>
            )}
        </>
    );
};


const Body = ({ setMenuOpen, chat, onTypingEnd, onTypingStop }) => {
    const {
        chatContainerRef,
        chats,
        inputText,
        inputHeight,
        isScrollAtBottom,
        isScrolling,
        handleTypingEnd,
        handleTypingStop,
        handleChange,
        handleKeyDown,
        handleSendClick,
        scrollToBottom
    } = BodyLogic({ setMenuOpen, chat, onTypingEnd, onTypingStop });

    return (
        <div>
            <HeaderWrapper>
                <LangContainer>
                    <LangImg />
                    <KrenImg />
                </LangContainer>
                <MainImg />
                <MenuImg onClick={() => { setMenuOpen(prevState => !prevState) }} />
            </HeaderWrapper>

            <BodyBg />
            <ChatContainer ref={chatContainerRef} $inputHeight={inputHeight}>
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

            <BottomWrap style={{ height: inputHeight + 46 }}>
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
                    <SendImg onClick={handleSendClick} />
                </InputWrapper>
            </BottomWrap>

            <ScrollToBottomButton 
                $isVisible={!isScrollAtBottom && !isScrolling} 
                onClick={scrollToBottom}
            >
                🡫
            </ScrollToBottomButton>
        </div>
    );
};

export default Body;
