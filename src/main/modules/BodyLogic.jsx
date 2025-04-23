// BodyLogic.jsx
import { useState, useLayoutEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import { ProcessChat } from './ProcessChat';
import { ProcessLog } from './ProcessLog';
import { ProcessChatLoad } from './ProcessChatLoad';
import { ProcessLLM } from './ProcessLLM';

const BodyLogic = ({ setMenuOpen, chat, onTypingEnd, onTypingStop, setChatOpen, setChatList, chatList, isChatListCreated, setIsChatListCreated, chats, setChats, isTyping, setIsTyping, roomID, setRoomID}) => {
    const [inputHeight, setInputHeight] = useState(77); // 입력창 기본 높이
    const [inputText, setInputText] = useState(""); // 채팅 내용
    const chatContainerRef = useRef(null); // 스크롤 컨테이너 참조
    const chatAnimation = Cookies.get('chatAnimation') === 'true';  // 쿠키에서 chatAnimation 값을 가져옴
    const [isScrollAtBottom, setIsScrollAtBottom] = useState(true); // 스크롤이 가장 밑에 있는지 확인
    const [isScrolling, setIsScrolling] = useState(false); // smoothScrollToBottom 동작 여부
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

    // 텍스트 입력이 변경될 때마다 inputHeight를 동기적으로 반영
    useLayoutEffect(() => {
        const newHeight = document.getElementById("question").scrollHeight;
        setInputHeight(newHeight < 168 ? (newHeight > 72 ? newHeight + 20 : 77) : 168);
    }, [inputText]);

    // SendImg 버튼을 클릭했을 때
    const handleSendClick = () => {
        addChat();
    };

    //타이핑효과가 끝났을 때
    const handleTypingEnd = useCallback(() => {
        setIsTyping(false); // 타이핑 상태 종료
        if (chatAnimation) {
            if (chatContainerRef.current) {
                setIsScrolling(false); // 스크롤이 시작되었음을 표시
                setIsScrollAtBottom(true); // 스크롤을 이동시킨 후에는 버튼 숨기기
            }
        }
    }, [chatAnimation]);

    // 타이핑 효과를 중단시켰을 때
    const handleTypingStop = useCallback(() => {
        setIsTyping(false); // 타이핑 상태 종료
    }, []);

    // 채팅
    const addChat = async () => {
        if (inputText.trim() && !isTyping) {
            const currentTime = new Date();
            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, '0');
            const day = String(currentTime.getDate()).padStart(2, '0');
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');

            const formattedTime = `${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
            const formattedTimeForTitle = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;     // 채팅 목록에 표시할 시간 포맷
            
            const newChat = {
                text: inputText.trim(),
                time: formattedTime,
                isReply: false
            };
            setChats(prevChats => [...prevChats, newChat]); // 채팅 후 바로 화면에 출력

            setInputText('');
            setInputHeight(77);

            const replyChat = {
                text: `### Hello, World!
This is a markdown message with **bold** text and *italic* text.
- List item 1
- List item 2
- List item 3

### Hello, World!
This is a markdown message with **bold** text and *italic* text.
- List item 1
- List item 2
- List item 3

### Hello, World!
This is a markdown message with **bold** text and *italic* text.
- List item 1
- List item 2
- List item 3
`,
                time: formattedTime,
                isReply: true
            };
            setChats(prevChats => [...prevChats, replyChat]); // 답변 받은 후 화면에 출력

            setIsTyping(true); // 타이핑 시작 상태로 설정
            if(sessionStorage.getItem('userId') != null){
                if(!roomID){
                    const chatListNum = await ProcessChat(inputText.trim());
                    setRoomID(chatListNum);
                    await ProcessLog(inputText.trim(), chatListNum, 0);
                    await ProcessLog(replyChat.text, chatListNum, 1);
                    setChatList(await ProcessChatLoad());
                }
                else{
                    await ProcessLog(inputText.trim(), roomID, 0);
                    await ProcessLog(replyChat.text, roomID, 1);
                }
            }
        }
    };

    // 채팅이 추가될 때 스크롤 최신 위치로 이동
    const scrollToLatestMessage = () => {
        if (chatContainerRef.current) {
            const chatMessages = chatContainerRef.current.children;
            if (chatMessages.length > 1) {
                const lastMessage = chatMessages[chatMessages.length - 2]; // 마지막 메시지 요소
                lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 맨 위로 정렬
            }
        }
    };
    
    // 채팅이 추가될 때 스크롤 최신 위치로 이동
    useLayoutEffect(() => {
        if (!isTyping) {
            if (!chatAnimation && chatContainerRef.current) {
                scrollToLatestMessage();
            }
        }
    }, [isTyping, chats]); // chats 변경 시 실행
    
    useLayoutEffect(() => {
        if (chatAnimation && chatContainerRef.current) {
            scrollToBottom(); // 부드럽게 스크롤 이동
        }
    }, [chats]);

    // 스크롤 위치를 감지하는 함수
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const isAtBottom = chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop === chatContainerRef.current.clientHeight;
            setIsScrollAtBottom(isAtBottom);
            if (isAtBottom) {
                setIsScrolling(false); // 스크롤이 끝났을 때, 스크롤이 동작 중이지 않음을 설정
            }
        }
    };

    // 메시지가 추가될 때마다 스크롤 상태를 확인
    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            const chatContainer = chatContainerRef.current;
            chatContainer.addEventListener('scroll', handleScroll);

            // 컴포넌트가 업데이트될 때마다 체크
            if (chatContainer.scrollHeight === chatContainer.scrollTop + chatContainer.clientHeight) {
                setIsScrollAtBottom(true); // 처음엔 스크롤이 가장 밑에 있을 수 있음
            } else {
                setIsScrollAtBottom(false); // 아니라면 버튼 표시
            }

            return () => {
                chatContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isTyping]); // 채팅 내용이 변할 때마다 상태 체크

    // 스크롤 하단으로 이동시키기
    const smoothScrollToBottom = () => {
        if (chatContainerRef.current) {
            setIsScrolling(true); // 스크롤이 시작되었음을 표시
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'  // 부드러운 스크롤 효과
            });
            setIsScrollAtBottom(true); // 스크롤을 이동시킨 후에는 버튼 숨기기
        }
    };

    const scrollToBottom = () => {
        smoothScrollToBottom();  // 위에서 정의한 부드러운 스크롤 함수 호출
    };

    return{
        chatContainerRef,
        chats,
        inputText,
        inputHeight,
        isScrollAtBottom,
        isScrolling,
        isTyping,
        handleTypingEnd,
        handleTypingStop,
        handleChange,
        handleKeyDown,
        handleSendClick,
        scrollToBottom
    };
};

export default BodyLogic;