import axios from 'axios';

const BASE_URL = Process.env.SPRING_API_BASE_URL;

export const ProcessDeleteAllChat = async () => {
    try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(`${BASE_URL}/api/Chat/deleteAllChatList`, userId, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response && response.status === 200) {
            return true; // 성공적으로 삭제됨
        } else {
            alert('모든 채팅 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
            return false; // 실패
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
        return false; // 에러 발생
    }
};