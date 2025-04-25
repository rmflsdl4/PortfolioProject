import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SPRING_API_BASE_URL;

export const ProcessChatLoad = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/Chat/getChatlists`, sessionStorage.getItem("userId"), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response && response.status === 200) {
            const chatList = response.data.map(chat => ({
                chatListNum: chat.chatListNum,  // chatListNum 값 저장
                chatTitle: chat.chatTitle       // chatTitle 값 저장
            }));
            
            return chatList;
        } else {
            alert('채팅 목록을 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            return [];  // 실패 시 빈 배열 반환
        }
    } catch (error) {
        if (error.response) {
            console.error('에러 발생:', error.response);
            switch (error.response.status) {
                case 400:
                    alert('잘못된 요청입니다. 입력한 정보를 확인해주세요.');
                    break;
                case 500:
                    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    break;
                case 503:
                    alert('서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.');
                    break;
                default:
                    alert('알 수 없는 오류가 발생했습니다.');
                    break;
            }
        } else {
            alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        }
        return [];  // 에러 발생 시 빈 배열 반환
    }
};
