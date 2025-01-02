//RegisterForm.jsx
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

// 스타일 컴포넌트
const InputWrap = styled.div`
    position: absolute;
    top: 240px;
    right: 50%;
    transform: translate(50%, 0%);
    border: 1px solid #004e2b;
    border-radius: 5px;
    opacity: 85%;
    padding: 0px;
    width: 274px;
    height: 53px;
`;

const InputIdWrap = styled(InputWrap)``;

const InputPwdWrap = styled(InputWrap)`
    top: 320px;
`;

const InputPwdChkWrap = styled(InputWrap)`
    top: 400px;
`;

const SelectWrap = styled(InputWrap)`
    top: 480px;
`;

const Input = styled.input.attrs({
    type: 'text',
    maxLength: 14,
})`
    padding: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 30px;
    font-size: 16px;
    border: 0px;
    outline: none;

    &:focus {
        border: 0px;
    }
`;

const InputRegiId = styled(Input)``;

const InputRegiPwd = styled(Input).attrs({
    type: 'password',
    maxLength: 20,
})``;

const InputRegiPwdChk = styled(Input).attrs({
    type: 'password',
    maxLength: 20,
})``;

const IdText = styled.div`
    position: absolute;
    top: 228px;
    left: 18%;
    width: 40px;
    height: 25px;
    background-color: #ffffff;
    text-align: center;
    z-index: 1;

    a {
        text-align: center;
        font-size: 12px;
        color: #004e2b;
        opacity: 85%;
        font-weight: bold;
    }
`;

const PwdText = styled(IdText)`
    width: 52px;
    top: 308px;
`;

const Register = styled.div`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;

    &.regiShowed {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;

const RegiIdText = styled(IdText)``;
const RegiPwdText = styled(PwdText)``;
const RegiPwdCheckText = styled(PwdText)`
    top: 388px;
    width: 78px;
`;

const SelectText = styled(PwdText)`
    top: 468px;
    width: 28px;
`;

const CustomSelect = styled.select`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 242px;
    height: 30px;
    font-size: 12px;
    border: 0;
    outline: none;
    background-color: transparent;
    color: #004e2b;
    font-weight: bold;

    option {
        color: #000;
        background: #fff;
    }
`;

const RegiButton = styled.button`
    position: absolute;
    top: 558px;
    right: 50%;
    transform: translate(50%, 0%);
    width: 274px;
    height: 64px;
    background-color: #26684B;
    border: 0px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`;

const LoginText = styled.a`
    position: absolute;
    width: 168px;
    top: 642px;
    right: 50%;
    transform: translate(50%, 0%);
    color: #757575;
    font-size: 15px;
    text-decoration: underline;
    text-underline-position : under;
    cursor: pointer;
`;

const RegisterForm = ({ showRegi, handleLoginText }) => {
    const { register, handleSubmit, reset } = useForm();

    // 폼 제출 이벤트 핸들러
    const onSubmit = (data) => {
        console.log('아이디:', data.regiUsername);
        console.log('비밀번호:', data.regiPassword);
        console.log('비밀번호 확인:', data.regiPwdCheck);
        console.log('선택한 학과:', data.department);
        reset();
    };

    return (
        <Register className={showRegi ? 'regiShowed' : ''}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 아이디 입력 */}
                <InputIdWrap>
                    <InputRegiId id="regiUsername" {...register('regiUsername', { required: true })} />
                </InputIdWrap>
                <RegiIdText>
                    <a>아이디</a>
                </RegiIdText>

                {/* 비밀번호 입력 */}
                <InputPwdWrap>
                    <InputRegiPwd id="regiPassword" {...register('regiPassword', { required: true })} />
                </InputPwdWrap>
                <RegiPwdText>
                    <a>비밀번호</a>
                </RegiPwdText>

                {/* 비밀번호 확인 입력 */}
                <InputPwdChkWrap>
                    <InputRegiPwdChk id="regiPwdCheck" {...register('regiPwdCheck', { required: true })} />
                </InputPwdChkWrap>
                <RegiPwdCheckText>
                    <a>비밀번호 확인</a>
                </RegiPwdCheckText>

                {/* 셀렉트 */}
                <SelectWrap>
                    <CustomSelect id="department" {...register('department', { required: true })}>
                        <option value="">눌러서 선택하세요</option>
                        <option value="0">컴퓨터공학과</option>
                        <option value="1">AI소프트웨어학과</option>
                    </CustomSelect>
                </SelectWrap>
                <SelectText><a>학과</a></SelectText>

                <RegiButton type="submit">회원가입</RegiButton>
                <LoginText onClick={handleLoginText}>이미 계정이 있으신가요?</LoginText>
            </form>
        </Register>
    );
};

export default RegisterForm;
