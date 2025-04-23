import axios from 'axios';

export const ProcessEditChatTitle = async (chatListNum, chatTitle) => {
    try {
        const requestData = {
            chatListNum: chatListNum,
            chatTitle: chatTitle,
        };
        const response = await axios.post('http://localhost:8080/api/Chat/updateChatTitle', requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response); // 응답 데이터 확인
        if (response && response.status === 200) {
            return true; // 성공적으로 업데이트됨
        } else {
            alert('채팅 제목 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
}