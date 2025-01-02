import React, { useState, useLayoutEffect, useRef } from 'react';
import styled from "styled-components";
import { 
    MainImg,
    LangImg,
    MenuImg,
    KrenImg,
    SendImg
} from './ImageComponents';
import TextareaAutosize from 'react-textarea-autosize';

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
    margin: 10px 0 0 auto; 
    align-self: flex-start;
`;

const MessageWithTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 860px;
`;

const Body = ({ setMenuOpen }) => {
    const [inputHeight, setInputHeight] = useState(77); // 입력창 기본 높이
    const [inputText, setInputText] = useState(""); // 채팅 내용
    const [chats, setChats] = useState([]); // 채팅 상태 추가
    const chatContainerRef = useRef(null); // 스크롤 컨테이너 참조

    // 입력창 높이 관련 로직
    const handleChange = (e) => {
        const newHeight = e.target.scrollHeight;
        setInputHeight(newHeight < 168 ? (newHeight > 72 ? newHeight + 20 : 77) : 168);
        setInputText(e.target.value);
    };

    // 입력창에서 엔터를 입력했을 때
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addChat();
        }
    };

    // SendImg 버튼을 클릭했을 때
    const handleSendClick = () => {
        addChat();
    };

    // 채팅
    const addChat = () => {
        if (inputText.trim()) {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const formattedTime = `${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
            
            const newChat = {
                text: inputText.trim(),
                time: formattedTime
            };
    
            setChats([...chats, newChat]);
            setInputText('');
            setInputHeight(77);
            console.log(inputText);
        }
    };

    // 채팅이 추가될 때 스크롤 최신 위치로 이동
    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]); // chats가 변경될 때마다 실행

    // 텍스트 입력이 변경될 때마다 inputHeight를 동기적으로 반영
    useLayoutEffect(() => {
        const newHeight = document.getElementById("question").scrollHeight;
        setInputHeight(newHeight < 168 ? (newHeight > 72 ? newHeight + 20 : 77) : 168);
    }, [inputText]);    // inputText가 변경될 때마다 실행

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
                        <ChatMessage>{chat.text}</ChatMessage>
                        <ChatTime>{chat.time}</ChatTime>
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
        </div>
    );
};

export default Body;
