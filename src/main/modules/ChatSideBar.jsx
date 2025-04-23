//ChatSideBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ProcessLogLoad } from './ProcessLogLoad';
import { ProcessChatLoad } from './ProcessChatLoad';
import { ProcessEditChatTitle } from './ProcessEditChatTitle';
import { ProcessDeleteChat } from './ProcessDeleteChat';
import { ProcessDeleteAllChat } from './ProcessDeleteAllChat';
import {    // 이미지 임포트
    DeleteImg,
    ChatListImg,
    ChatMenuImg,
    NewChatImg,
    RenameImg
} from './ImageComponents';
import { ProcessChatLoad } from './ProcessChatLoad';
import { ProcessLogLoad } from './ProcessLogLoad';

const ChatMenuWrapper = styled.nav`
    margin-left: ${props => props.$chatOpen ? '0px' : '-338px'};
    position: fixed;
    height: calc(100vh - 120px);
    width: 338px;
    bottom: 0%;
    left: 0%;
    background-color: #ffffff;
    border-right: 1px solid #004e2b;
    z-index: 800;
    overflow-y: overlay;
    overflow-x: hidden;
    transition: margin-left 0.5s;
    box-shadow: 3px 2px 3px gray;

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
`;

const ChatListText = styled.a`
    font-size: 25px;
    font-weight: bold;
    color: #004E2B;
    position: absolute;
    top: 20px;
    left: 30px;
`;

const ChatListWrapper = styled.div`
    position: absolute;
    top: 70px;
    left: 0;
    height: 640px;
    width: 338px;
    padding-bottom: 18px;
    overflow-y: overlay;
    overflow-x: hidden;
    background-color: #ffffff;
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
`;

const ListWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 28px;
    margin-top: 18px;
    width: 300px;
`;

const SelectArea = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const ChatNameText = styled(ChatListText)`
    font-size: 20px;
    font-weight: 700;
    color: #004E2B;
    position: static;
    margin-left: 10px;
`;

const RemoveAllWrapper = styled.div`
    position: absolute;
    top: 740px;
    left: 20px;
    height: 50px;
    width: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => (props.$isClickable ? 'pointer' : 'not-allowed')};
    opacity: ${props => (props.$isClickable ? '1' : '0.3')};
`;

const RemoveAllText = styled(ChatListText)`
    font-size: 25px;
    font-weight: bold;
    color: #ff0000;
    position: static;
    margin-left: 10px;
`;

const ChatLine = styled.div`
    position: absolute;
    top: 69px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    border: 0px;
    border-top: 1px solid #004e2b;
    opacity: 50%;
    box-shadow: 0px 0px 3px gray;
`;

const ChatLine2 = styled(ChatLine)`
    top: 728px;
`;

const ChatDeleteMenu = styled.div`
    position: absolute;
    background-color: #ffffff;
    top: 24px;
    right: 20px;
    height: 91px;
    width: 150px;
    border: 1px solid #004e2b;
    border-radius: 5px;
    z-index: 900;
    opacity: ${props => (props.$show ? '1' : '0')};
    visibility: ${props => (props.$show ? 'visible' : 'hidden')};
    transition: opacity 0.1s ease, visibility 0.1s;
`;

const RenameWrapper = styled.div`
    margin-top: 14px;
    margin-left: 12px;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
`;

const RenameText = styled.a`
    margin-left: 5px;
    font-size: 17px;
    font-weight: bold;
    color: #004e2b;
`;

const DeleteWrapper = styled.div`
    margin-top: 10px;
    margin-left: 7px;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
`;

const DeleteImg2 = styled(DeleteImg)`
    width: 30px;
    height: 30px;
`;

const DeleteText = styled.a`
    margin-left: 5px;
    font-size: 17px;
    font-weight: bold;
    color: #ff0000;
`;

const EditInput = styled.input`
    margin-left: 4px;
    font-size: 20px;
    font-weight: bold;
    color: #004E2B;
    background-color: #f1f1f1;
    border: 1px solid #004e2b;
    border-radius: 5px;
    padding: 5px;
    height: 30px;
    width: 220px;
    box-sizing: border-box;
    outline: none;
    
    &:focus {
        border-color: #004e2b;
        background-color: #ffffff;
    }

    &::placeholder {
        color: #b5b5b5;
    }
`;

const BgShadow = styled.div`
    position: absolute;
    transition: 0.3s;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 899;
    opacity: ${props => props.$alertConfirm ? '1' : '0'};
    pointer-events: ${props => props.$alertConfirm ? 'auto' : 'none'};
    visibility: ${props => props.$alertConfirm ? 'visible' : 'hidden'};
`;

const RemoveAllConfirmWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 150px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #004e2b;
    background-color: #ffffff;
    z-index: 900;
    transition: 0.3s;
    opacity: ${props => props.$alertConfirm ? '1' : '0'};
    pointer-events: ${props => props.$alertConfirm ? 'auto' : 'none'};
    visibility: ${props => props.$alertConfirm ? 'visible' : 'hidden'};
`;

const AlertTitle = styled.a`
    font-size: 20px;
    font-weight: bold;
    color: #004E2B;
    position: absolute;
    text-align: center;
    width: 250px;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
`;

const AlertTitle2 = styled(AlertTitle)`
    color: #ff0000;
    font-size: 14px;
    top: 56px;
`;

const AlertText = styled.a`
    font-size: 20px;
    font-weight: bold;
    color: #ff0000;
    position: absolute;
    text-align: center;
    width: 50px;
    top: 98px;
    left: 70px;
    cursor: pointer;
`;

const AlertText2 = styled(AlertText)`
    color: #004E2B;
    left: 50%;
    transform: translateX(50%);
`;

const ChatSideBar = ({ chatOpen, chatList, setChatList, isChatListCreated, handleNewChatClick, chat, setChats, roomID, setRoomID }) => {
    const [activeDeleteMenuIndex, setActiveDeleteMenuIndex] = useState(null); // 활성화된 삭제 메뉴의 인덱스를 저장
    const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 인덱스 저장
    const [newChatName, setNewChatName] = useState(''); // 새로 입력한 채팅 이름 저장
    const listRefs = useRef([]); // ListWrapper의 각 요소에 대한 ref 배열
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [chatLogData, setChatLogData] = useState({}); // 채팅방에 맞는 채팅 로그 저장

    // 항목 삭제 함수
    const handleDeleteClick = async (chatListNum) => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
            if(await ProcessDeleteChat(chatListNum)){
                if(roomID === chatListNum){
                    window.location.reload();
                }
                else{
                    setChatList(await ProcessChatLoad());
                }
                alert("채팅방이 삭제되었습니다.");
            }
            else{
                alert("채팅방 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
        setActiveDeleteMenuIndex(null);
    };

    // 메뉴 클릭 시 메뉴 토글
    const handleMenuClick = (index) => {
        console.log("index", index);
        setActiveDeleteMenuIndex(activeDeleteMenuIndex === index ? null : index);
    };

    const handleChatNameClick = async (chatListNum) => {
        try {
            const response = await ProcessLogLoad(chatListNum); // chatLogs 배열 가져오기
    
            const formattedChats = response.map(log => ({
                text: log.chatContent,
                time: new Date(log.chatDate).toLocaleString(), // 보기 좋게 날짜 포맷
                isReply: log.chatSender === 1  // 1이면 AI, 0이면 사용자
            }));
            setRoomID(chatListNum); // roomId 설정
            setChats(formattedChats);  // 상태 저장
        } catch (err) {
            console.error("채팅 로그 불러오기 실패:", err);
        }
    };

    // 채팅 이름 수정 시작
    const handleRenameClick = (index, currentName) => {
        setEditingIndex(index); // 수정 중인 항목의 인덱스를 설정
        setNewChatName(currentName); // 현재 이름을 입력 필드에 미리 채워넣기
        setActiveDeleteMenuIndex(activeDeleteMenuIndex === index ? null : index);
    };

    // 채팅 이름 변경 완료
    const handleRenameSubmit = async (index, chatListNum) => {
        // 만약 newChatName이 비어있다면, 이전 이름으로 되돌림
        if (newChatName.trim() === '') {
            setNewChatName(chatList[index]); // 빈값이면 원래 이름으로 되돌리기
        } else {
           if(await ProcessEditChatTitle(chatListNum, newChatName)){
                setChatList(await ProcessChatLoad());
           }
           else{
                alert("채팅방 이름 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
           }
        }
        setEditingIndex(null); // 수정 모드 종료
    };

    // 입력 필드 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        setNewChatName(e.target.value); // 입력 값으로 상태 업데이트
    };

    // 이름이 9자리 이상일 경우 앞 9자리 + '...'로 변경
    const truncateChatName = (name) => {
        if (name.length > 9) {
            return name.slice(0, 16) + '...'; // 9자리 이상일 경우 앞 9자리만 표시하고 '...' 추가 // 날짜 시 분 까지 보이게 16으로 수정
        }
        return name;
    };

    //마우스가 영역을 벗어날 시 메뉴 사라짐
    const handleMouseLeaveMenu = () => {
        setActiveDeleteMenuIndex(null);
    };

    const handleRemoveAllChats = () => {
        ProcessDeleteAllChat();
        setChatList([]);
        setRoomID(null);
        setChats([]);
        setAlertConfirm(false);
    };

    // 채팅 목록 불러옴 (채팅 목록)
    const chatListLoad = async () => {
        if (sessionStorage.getItem('userId') != null) { // 유저 아이디가 존재할 때만 채팅 목록 가져옴
            const chatListData = await ProcessChatLoad();
            // console.log("채팅 목록:", chatListData);
            // chatLogLoad(chatList.chatListNum);
            setChatList(chatListData);
        }
    };

    // 채팅 목록 가져오기
    useEffect(() => {
        const fetchData = async () => {
            await chatListLoad(); // 채팅 목록 가져옴
        };
        fetchData();    //비동기 함수 fetchData 호출
    }, []);

    // // 채팅 로그 불러옴 (각 채팅에 맞는 채팅 내역)
    // const chatLogLoad = async (chatListNum) => {
    //     try {
    //         const chatLog = await ProcessLogLoad(chatListNum);
    //         if (chatLog && chatLog.length > 0) {
    //             setChatLogData(prevState => ({
    //                 ...prevState,
    //                 [chatListNum]: chatLog[0]?.chatContent || "내용 없음",
    //             }));
    //         } else {
    //             console.warn(`채팅 로그가 비어 있습니다: ${chatListNum}`);
    //         }
    //     } catch (error) {
    //         console.error(`채팅 로그를 불러오는 중 오류 발생 (${chatListNum}):`, error);
    //     }
    // };

    // // 모든 채팅 로그 불러오기
    // const fetchAllChatLogs = async () => {
    //     for (const chat of chatList) {
    //         await chatLogLoad(chat.chatListNum); // 각 채팅방의 로그 가져옴
    //     }
    // };

    // // 각 채팅 내역 가져오기
    // useEffect(() => {
    //     if (chatList.length > 0) {
    //         fetchAllChatLogs();
    //     }
    // }, [chatList]);

    // 위 세개의 함수는 채팅 목록 제목을 첫 채팅으로 해서 불러오는 함수

    // 새로운 채팅방 추가를 할려다가 안함
    // const handleNewChatClick = (newChat) => {
    //     setChatList((prevChatList) => [...prevChatList, newChat]);
    // };

    // 각 채팅방 클릭시 채팅 불러오기
    const chatListClick = async (chatListNum) => {
        const chat = await ProcessLogLoad(chatListNum);
        const setLoadChat = chat.map(item => ({     // 채팅 로그를 가져온다는 값을 추가
            ...item,
            loadChat: 1
        }));

        console.log("채팅 클릭 ", setLoadChat);
        chatLog(setLoadChat);
    }

    return (
        <>
            <ChatMenuWrapper $chatOpen={chatOpen}>
                <ChatListText>채팅 목록</ChatListText>
                <NewChatImg onClick={handleNewChatClick} />     {/* 새로운 채팅방 생성 버튼(현재는 현재 채팅 삭제만 하도록 되어있음) */}
                <ChatLine />
                <ChatListWrapper>
                {chatList.map((item, index) => (
                    <ListWrapper
                        key={index}
                        className="chat-item"
                        ref={el => listRefs.current[index] = el} // 각 ListWrapper에 ref 연결
                    >
                        <SelectArea>    {/* 채팅방(누르면 해당 채팅으로 이동하도록 수정예정) */}
                            <ChatListImg />
                            {editingIndex === index ? (
                                // 수정 모드일 때는 입력 필드를 보여줌
                                <EditInput
                                    type="text"
                                    value={newChatName}
                                    onChange={handleInputChange}
                                    onBlur={() => handleRenameSubmit(index, item.chatListNum)} // 블러(포커스 외) 시 수정 완료
                                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(index, item.chatListNum)} // 엔터키 시 수정 완료
                                    autoFocus
                                    placeholder="새로운 이름 입력"
                                />
                            ) : (
                                // 수정 모드가 아닐 때는 텍스트를 출력하며, 9자리 이상은 '...'로 잘라서 표시
                                <ChatNameText onClick={() => handleChatNameClick(item.chatListNum)}> {/* chatListNum 사용 */}
                                    {truncateChatName(item.chatTitle)}
                                </ChatNameText>
                            )}
                        </SelectArea>
                        <ChatMenuImg onClick={() => handleMenuClick(index)} onMouseLeave={handleMouseLeaveMenu} />
                        <ChatDeleteMenu
                            $show={activeDeleteMenuIndex === index}
                            style={{
                                top: listRefs.current[index]?.offsetTop + 28 + 'px', // ListWrapper 위에 위치하도록 조정
                            }}
                            onMouseEnter={() => setActiveDeleteMenuIndex(index)}
                            onMouseLeave={handleMouseLeaveMenu}
                        >
                            <RenameWrapper onClick={() => handleRenameClick(index, item.chatTitle)}> {/* chatTitle 사용 */}
                                <RenameImg />
                                <RenameText>이름 바꾸기</RenameText>
                            </RenameWrapper>
                            <DeleteWrapper onClick={() => handleDeleteClick(item.chatListNum)}>    {/* 채팅 삭제 버튼 */}
                                <DeleteImg2 />
                                <DeleteText>삭제</DeleteText>
                            </DeleteWrapper>
                        </ChatDeleteMenu>
                    </ListWrapper>
                ))}
                </ChatListWrapper>
                <ChatLine2 />
                <RemoveAllWrapper $isClickable={chatList.length > 0} onClick={() => chatList.length > 0 && setAlertConfirm(prevState => !prevState)}>
                    <DeleteImg />
                    <RemoveAllText>모든 내역 삭제</RemoveAllText>
                </RemoveAllWrapper>
                <BgShadow $alertConfirm={alertConfirm} />
                <RemoveAllConfirmWrapper $alertConfirm={alertConfirm}>
                    <AlertTitle>정말로 삭제하시겠습니까?</AlertTitle>
                    <AlertTitle2>※이 과정은 되돌릴 수 없습니다.</AlertTitle2>
                    <AlertText onClick={handleRemoveAllChats}>삭제</AlertText>  {/* 모든 채팅 목록 삭제 버튼 */}
                    <AlertText2 onClick={() => { setAlertConfirm(prevState => !prevState) }}>취소</AlertText2>
                </RemoveAllConfirmWrapper>
            </ChatMenuWrapper>
        </>
    );
};

export default ChatSideBar;