//Body.jsx
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from "styled-components";
import { 
    MainImg,
    LangImg,
    MenuImg,
    KrenImg,
    SendImg,
    pic21,
    pic22,
    pic23,
    pic24,
    pic25,
    pic26,
    pic27,
    pic28,
    LightyImg,
    LightyImg2,
    ChatImg
} from './ImageComponents';
import TextareaAutosize from 'react-textarea-autosize';
import Cookies from 'js-cookie';
import BodyLogic from './BodyLogic';
import { marked } from 'marked';

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

const BodyWrapper = styled.div`
`;

const ChatImgWrapper = styled.div`
    margin-left: ${props => props.$chatOpen ? '338px' : '0px'};
    background-color: #ffffff;
    z-index: 900;
    width: 40px;
    height: 108px;
    position: fixed;
    top: 190px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid #004e2b;
    border-left: 1px solid #ffffff;
    border-top: 1px solid #004e2b;
    border-bottom: 1px solid #004e2b;
    box-shadow: 3px 3px 3px gray;
    transition: margin-left 0.5s;
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
    width: ${props => props.$chatOpen ? 'calc(100% - 338px)' : '100%'};
    background-color: #EBF1EE;
    position: fixed;
    transition: 0.5s;
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
    flex-direction: row;
    align-items: flex-start;
    width: 860px;
    position: relative;
    left: -47px;
`;

const MessageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 15px;
`;

const MessageContent2 = styled(MessageContent)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 860px;
    transform: translateX(47px);
`;

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 860px;
`;

const LightyName = styled.a`
    padding-left: 10px;
    font-weight: bold;
    font-size: 27px;
    color: #004E2B;
`;

const LightyImgWrapper = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;
    width: 78px;
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
    min-height: 27px;
    max-width: 65%;
    align-self: flex-start;

    p, h1, h2, h3, h4, h5, h6, span {
        margin : 0;
        padding : 0;
    }
    
    ul, ol {
        margin : 0;
        padding-left: 20px;
    }

    li {
        margin-bottom: 5px;
    }
`;

const ReplyTime = styled.div`
    font-size: 15px;
    font-family: 'Kanit', sans-serif;
    color: #000000;
    margin: 10px 0 0 10px; 
    align-self: flex-start;
`;

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 860px;
    transform: translateX(-93px);
`;

const WelcomeContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 15px;
`;

const WelcomeMessage = styled(ReplyMessage)`

`;

const WelcomeMessage2 = styled(WelcomeMessage)`
    
`;

const WelcomeLink = ({ href, imgSrc, text }) => (
    <LinkWrapper href={href} target="_blank">
        <LinkImage src={imgSrc} alt={text} />
        <LinkText>{text}</LinkText>
    </LinkWrapper>
);

const WelcomeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 132px);
    grid-template-rows: repeat(2, 125px);
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const LinkWrapper = styled.a`
    width: 132px;
    height: 125px;
    border: solid 1px #004E2B;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: white;
`;

const LinkImage = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
`;

const LinkText = styled.span`
    margin-top: 5px;
    font-size: 17px;
    color: #000000;
    text-align: center;
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
    left: ${props => props.$chatOpen ? 'calc(58.8%)' : '50%'};
    transform: translateX(700%);
    padding: 0 0 6px 0;
    font-size: 30px;
    color: #004e2b;
    background-color: #ffffff;
    border: 1px #004e2b solid;
    border-radius: 50%;
    cursor: pointer;
    z-index: 900;
    transition: width, 0.5s;
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

const ChatLine3 = styled.div`
    position: absolute;
    opacity: 50%;
    box-shadow: 0px 0px 3px gray;
    border-right: 1px solid #004e2b;
    width: 0;
    top: 9px;
    left: ${props => props.$chatOpen ? '0px' : '-1px'};
    transform: translateX(-1px);
    height: 90px;
    z-index: 800;
    transition: 0.5s;
`;

const Move = styled.div`
    transition: 0.5s;
    position: absolute;
    height: 100vh;
    bottom: 0;
    right: 0;
    width: ${props => props.$chatOpen ? 'calc(100% - 338px)' : '100%'};
`;

// 타이핑 효과를 위한 컴포넌트
const TypingEffectReply = ({ chat, onTypingEnd, onTypingStop, scrollToBottom, chatOpen }) => {
    const [typedText, setTypedText] = useState(""); // 타이핑 중인 텍스트
    const [index, setIndex] = useState(0); // 타이핑할 위치
    const typingSpeed = 50; // 타이핑 속도 (ms)
    const chatAnimation = Cookies.get('chatAnimation') === 'true'; // 쿠키에서 chatAnimation 값 가져옴
    const selectedStyle = Cookies.get('selectedStyle'); // 쿠키에서 selectedStyle 값 가져옴
    const [isTyped, setIsTyped] = useState(false); // 이미 텍스트가 타이핑되었는지 확인하는 상태
    const [finalMessage, setFinalMessage] = useState(null); // 최종 출력 메시지를 저장
    const messageRef = useRef(null); // ReplyMessage에 대한 ref
    const prevHeight = useRef(0);  // 이전 높이를 저장할 ref
  
    // 마크다운 변환을 메모이제이션하여 불필요한 계산 방지
    const finalMessageHTML = useMemo(() => marked(chat.text), [chat.text]);
  
    // 텍스트의 각 문자를 AnimatedChar로 감싸서 애니메이션을 추가
    const renderTypedText = useCallback((text) => {
        const element = document.createElement('div');
        element.innerHTML = text;
    
        const walk = (node) => {
            if (node.nodeType === 3) {  // 텍스트 노드 처리
                return node.textContent.split(/(\s+)/).map((char, idx) => 
                    char.trim() === '' ? char : (
                        <AnimatedChar key={idx} $selectedStyle={selectedStyle}>
                            {char}
                        </AnimatedChar>
                    )
                );
            } else if (node.nodeType === 1) {  // 요소 노드 유지
                const children = Array.from(node.childNodes).map(walk);
                return React.createElement(node.nodeName.toLowerCase(), { key: node.key }, ...children);
            }
            return null;
        };
    
        return walk(element);
    }, [selectedStyle]);
  
    // 타이핑 효과 처리
    useEffect(() => {
        if (chatAnimation && !isTyped) {
            const typingEffect = () => {
                if (index < finalMessageHTML.length) {
                    setTypedText((prev) => prev + finalMessageHTML.slice(index, index + 3)); // 3글자씩 추가
                    setIndex((prev) => prev + 3); // 인덱스를 3씩 증가
                } else {
                    setIsTyped(true); // 타이핑 완료 상태로 설정
                    setFinalMessage(renderTypedText(typedText)); // 애니메이션 적용된 텍스트
                    if (onTypingEnd) onTypingEnd();
                }
            };
            const timeoutId = setTimeout(typingEffect, typingSpeed); // setTimeout을 사용하여 타이핑 속도 조절
            return () => clearTimeout(timeoutId);
        } else if (!chatAnimation && !isTyped) {    // 애니메이션을 껐을 경우
            setIsTyped(true);
            setFinalMessage(<div dangerouslySetInnerHTML={{ __html: finalMessageHTML }} />); // 애니메이션 없이 바로 출력
            if (onTypingEnd) onTypingEnd();
        }
    }, [index, finalMessageHTML, typedText, onTypingEnd, chatAnimation, isTyped, renderTypedText]);
  
    // 타이핑 중단 처리
    const handleStopTyping = () => {
        setIsTyped(true); // 타이핑 완료 상태로 변경
        if (onTypingStop) onTypingStop(); // 중단 시 콜백 호출
    };
  
    // ReplyMessage 크기 변경 감지
    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (messageRef.current) {
                const currentHeight = messageRef.current.scrollHeight; // 현재 높이
                if (currentHeight !== prevHeight.current) {  // 이전 높이와 비교하여 변화가 있을 때만 실행
                    prevHeight.current = currentHeight;  // 이전 높이를 갱신
                    if (chatAnimation) {
                    scrollToBottom(); // 높이가 변했을 때만 스크롤
                    }
                }
            }
        });
    
        if (messageRef.current) {
            observer.observe(messageRef.current, {
            childList: true, // 자식 요소의 추가/삭제만 관찰
            subtree: true, // 모든 자식 요소까지 감지
            characterData: true, // 텍스트의 변경도 감지
            });
        }
    
        return () => {
            if (messageRef.current) {
                observer.disconnect(); // cleanup
            }
        };
    }, [chatAnimation, scrollToBottom]); // chatAnimation과 scrollToBottom이 변경될 때마다 다시 실행
  
    return (
        <>
            <MessageWithTime>
                <LightyImgWrapper>
                    <LightyImg2 />
                </LightyImgWrapper>
                <MessageContent>
                    <NameContainer>
                    <LightyName>라이티</LightyName>
                    </NameContainer>
                    <ReplyMessage ref={messageRef}>
                    <div className="reply-message">
                        {finalMessage || renderTypedText(typedText)} {/* 애니메이션 처리된 텍스트 */}
                    </div>
                    </ReplyMessage>
                    <ReplyTime>{chat.time}</ReplyTime>
                </MessageContent>
            </MessageWithTime>
            {chatAnimation && !isTyped && (
                <StopTypingButton onClick={handleStopTyping} $chatOpen={chatOpen}>■</StopTypingButton>
            )}
        </>
    );
  };


const Body = ({ setMenuOpen, chat, onTypingEnd, onTypingStop, setChatOpen, chatOpen, setChatList, chatList, isChatListCreated, setIsChatListCreated, chats, setChats, isTyping, setIsTyping, roomID, setRoomID}) => {
    const {
        chatContainerRef,
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
    } = BodyLogic({ setMenuOpen, chat, onTypingEnd, onTypingStop, setChatOpen, setChatList, chatList, isChatListCreated, setIsChatListCreated, chats, setChats, isTyping, setIsTyping, roomID, setRoomID });

    const questionInputRef = useRef(null);

    useEffect(() => {
        if (!isTyping && questionInputRef.current) {
            questionInputRef.current.focus();  // isTyping이 true일 때 input에 포커스
        }
    }, [isTyping]);

    const chatListLog = (chat) => {
        console.log("Body ", chat);
        // const newChat = {
        //     text: inputText.trim(),
        //     time: chat.chatDate,
        //     isReply: false
        // };
        // setChats(prevChats => [...prevChats, newChat]);
    }

    useEffect(() => {
        if (chats.length > 0) {
            chatListLog(chats);
        }
    }, [chats]);

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

            <Move $chatOpen={chatOpen}>
            <BodyWrapper>
                <ChatImgWrapper $chatOpen={chatOpen} onClick={() => { setChatOpen(prevState => !prevState) }}>
                    <ChatImg />
                    <ChatLine3 $chatOpen={chatOpen}/>
                </ChatImgWrapper>
                <BodyBg />
                <ChatContainer ref={chatContainerRef} $inputHeight={inputHeight}>
                
                <WelcomeContainer>
                    <LightyImg />
                    <WelcomeContent>
                        <NameContainer>
                            <LightyName>라이티</LightyName>
                        </NameContainer>
                        <WelcomeMessage>안녕하세요, 저는 광주대학교 챗봇 GU_Bot이에요! <br/> 무엇을 도와드릴까요?</WelcomeMessage>
                        <WelcomeMessage2>
                            <WelcomeGrid>
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=491" imgSrc={pic21} text="학사일정" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=498" imgSrc={pic22} text="장학안내" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=420" imgSrc={pic23} text="교내연락처" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/bbs/?b_id=gwangju_school_bus&site=gwangju&mn=422" imgSrc={pic24} text="통학버스" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=514" imgSrc={pic25} text="증명발급" />
                                <WelcomeLink href="https://portal.gwangju.ac.kr/" imgSrc={pic26} text="등록금" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=474" imgSrc={pic27} text="수강정보" />
                                <WelcomeLink href="https://www.gwangju.ac.kr/page/?site=pvr&mn=871" imgSrc={pic28} text="캠퍼스 VR" />
                            </WelcomeGrid>
                        </WelcomeMessage2>
                        <ReplyTime>{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</ReplyTime>
                    </WelcomeContent>
                </WelcomeContainer>
                
                    {chats.map((chat, index) => (
                        <MessageWithTime key={index}>
                            {chat.loadChat ? (  // loadChat키 값을 통해 채팅 로그를 불러오는지 확인
                                <MessageContent2>   {/* 채팅 내역 표시 */}
                                    <ChatMessage>{chat.chatContent}</ChatMessage>
                                    <ChatTime>{chat.chatDate}</ChatTime>
                                    <ReplyMessage>{chat.chatContent}</ReplyMessage>
                                    <ReplyTime>{chat.chatDate}</ReplyTime>
                                </MessageContent2>
                            ) : (
                                chat.isReply ? (
                                    <TypingEffectReply
                                        chat={chat}
                                        onTypingEnd={handleTypingEnd}
                                        onTypingStop={handleTypingStop}
                                        scrollToBottom={scrollToBottom}
                                        chatOpen={chatOpen}
                                    />
                                ) : (
                                    <MessageContent2>
                                        <ChatMessage>{chat.text}</ChatMessage>
                                        <ChatTime>{chat.time}</ChatTime>
                                    </MessageContent2>
                                )
                            )}
                            
                        </MessageWithTime>
                    ))}
                </ChatContainer>
            </BodyWrapper>
            

            <BottomWrap style={{ height: inputHeight + 46 }} $chatOpen={chatOpen} >
                <InputWrapper $inputHeight={inputHeight}>
                    <QuestionInput
                        minRows="1"
                        maxRows="4"
                        id="question"
                        placeholder={isTyping ? "답변 작성중입니다." : "라이티에게 궁금한 것을 물어보세요 !"}
                        value={inputText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={isTyping} // isTyping이 true일 때 비활성화
                        ref={questionInputRef}
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
            </Move>
        </div>
    );
};

export default Body;
