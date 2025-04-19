// App.jsx
import React, { useState } from 'react';
import Header from './modules/Header';
import Body from './modules/Body';
import Footer from './modules/Footer';
import Nav from './modules/Nav';
import ChatSideBar from './modules/ChatSideBar';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [isChatListCreated, setIsChatListCreated] = useState(true);
    const [chats, setChats] = useState([]);
    
    const [isTyping, setIsTyping] = useState(false); // 타이핑 상태 관리
    
    // ChatSideBar에서 채팅 로그를 받아오는 함수
    const chatLog = (chat) => {
        // console.log("App ", chat);
        setChats(chat);
    };
    

    const handleNewChatClick = () => {
        setChats([]);
        setIsTyping(false);
        if (!isChatListCreated) {
            setIsChatListCreated(true); // 최초로 목록이 생성되었음을 표시
        }
    };

    return (
        <>
            <Header />
            <Body setMenuOpen={setMenuOpen} chatOpen={chatOpen} setChatOpen={setChatOpen} setChatList={setChatList} chatList={chatList} isChatListCreated={isChatListCreated} setIsChatListCreated={setIsChatListCreated} chats={chats} setChats={setChats} isTyping={isTyping} setIsTyping={setIsTyping} />
            <Footer />
            <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ChatSideBar chatOpen={chatOpen} setChatOpen={setChatOpen} chatList={chatList} setChatList={setChatList} isChatListCreated={isChatListCreated} handleNewChatClick={handleNewChatClick} chatLog={chatLog} />
        </>
    );
}

export default App;
