// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './modules/Header';
import Body from './modules/Body';
import Footer from './modules/Footer';
import Nav from './modules/Nav';
import ChatSideBar from './modules/ChatSideBar';
import { ProcessChat } from './modules/ProcessChat';
import { ProcessChatLoad } from './modules/ProcessChatLoad';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [isChatListCreated, setIsChatListCreated] = useState(true);
    const [chats, setChats] = useState([]);
    const [roomID, setRoomID] = useState(null); // 채팅방 번호
    
    const [isTyping, setIsTyping] = useState(false); // 타이핑 상태 관리

    useEffect(() => {
        const loadChatList = async () => {
            if (sessionStorage.getItem('userId') != null) {
                const chatListTitles = await ProcessChatLoad();  // 비동기 함수 기다리기
                setChatList(chatListTitles);  // 받은 채팅 목록 제목을 setChatList에 저장
                console.log("채팅 목록:", chatListTitles);  // 콘솔에 결과 출력
            }
        };
    
        loadChatList();  // 비동기 함수 호출
    }, []);

    const handleNewChatClick = async () => {
        setChats([]);
        setIsTyping(false);
        if(sessionStorage.getItem('userId') != null) {
            setRoomID(await ProcessChat());
            const chatlistTitles = await ProcessChatLoad();
            setChatList(chatlistTitles);
        }
        if (!isChatListCreated) {
            setIsChatListCreated(true); // 최초로 목록이 생성되었음을 표시
        }
    };

    return (
        <>
            <Header />
            <Body setMenuOpen={setMenuOpen} chatOpen={chatOpen} setChatOpen={setChatOpen} setChatList={setChatList} chatList={chatList} isChatListCreated={isChatListCreated} setIsChatListCreated={setIsChatListCreated} chats={chats} setChats={setChats} isTyping={isTyping} setIsTyping={setIsTyping} roomID={roomID} setRoomID={setRoomID} />
            <Footer />
            <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ChatSideBar chatOpen={chatOpen} setChatOpen={setChatOpen} chatList={chatList} setChatList={setChatList} isChatListCreated={isChatListCreated} handleNewChatClick={handleNewChatClick} chats={chats} setChats={setChats} roomID={roomID} setRoomID={setRoomID}/>
        </>
    );
}

export default App;
