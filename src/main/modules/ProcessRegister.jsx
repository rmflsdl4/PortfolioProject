import axios from "axios";

const BASE_URL = Process.env.SPRING_API_BASE_URL;

export const ProcessRegister = async (data, reset) => {
    try {
        const requestData = {
            id: data.regiUsername,
            pw: data.regiPassword,
            name: data.regiMail,
            email: data.regiName,
            gender: data.sex,
            birthDate: data.birth
        };

        const response = await axios.post(`${BASE_URL}/api/User/signUp`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response && response.status === 201) {
            alert('회원가입이 성공적으로 완료되었습니다!');
            reset();
            window.location.reload();
        } else {
            alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    } catch (error) {
        if (error.response) {
            console.error('에러 발생:', error.response);
            switch (error.response.status) {
                case 400:
                    alert('아이디가 이미 존재합니다. 다른 아이디를 사용해주세요.');
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
    }
};