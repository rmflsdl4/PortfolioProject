import axios from "axios";

const BASE_URL = Process.env.SPRING_API_BASE_URL;

export const ProcessLogin = async (data, reset) => {
    try {
        const requestData = {
            id: data.username,
            pw: data.password,
        };

        const response = await axios.post(`${BASE_URL}/api/User/login`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response && response.status === 200) {
            alert('로그인에 성공했습니다!');
            sessionStorage.setItem("userId", requestData.id);
            sessionStorage.setItem("chatListNum", "0");
            reset();
            window.location.reload();
        }
    } catch (error) {
        if (error.response) {
            console.error('에러 발생:', error.response);
            switch (error.response.status) {
                case 400:
                    alert('잘못된 요청입니다. 입력한 정보를 확인해주세요.');
                    break;
                case 401:
                    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
                    break;
                case 500:
                    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    break;
                default:
                    alert('알 수 없는 오류가 발생했습니다.');
                    break;
            }
        } else {
            alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }
};