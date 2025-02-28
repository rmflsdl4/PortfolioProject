//LoginForm.jsx
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ProcessLogin } from "./ProcessLogin.jsx";

// 스타일 컴포넌트
const LoginButton = styled.button`
    position: absolute;
    top: 240px;
    right: 50%;
    transform: translate(50%, 0%);
    width: 274px;
    height: 64px;
    background-color: #004e2b;
    opacity: 85%;
    border: 0px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 999;
    transition: top 0.5s ease-in-out;

    &.moved {
        top: 400px;
    }
`;

const Loginbox = styled.div`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    width: 338px;
    top: 0%;
    right: 0%;
    transition: 0.5s;

    &.showed {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;

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

const InputIdWrap = styled(InputWrap)`
`;

const InputPwdWrap = styled(InputWrap)`
    top: 320px;
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

  const InputId = styled(Input)`

  `;

  const InputPwd = styled(Input).attrs({
    type: 'password',
    maxLength: 20,
  })`
    
  `;

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
    width: 50px;
    top: 308px;
`;

const Loginbox2 = styled.div`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    width: 338px;
    top: 0%;
    right: 0%;
    transition: 0s;

    &.showed2 {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;


const LoginForm = ({ show, show2, movedDown }) => {
    const {
        register, 
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => ProcessLogin(data, reset))}>
        {/* 로그인 아이디 & 비밀번호 입력 부분 */}
        <Loginbox className={show ? 'showed' : ''}>
            <InputIdWrap>
                <InputId id="username" {...register("username", { required: true })} />
            </InputIdWrap>
            <IdText><a>아이디</a></IdText>
            <InputPwdWrap>
                <InputPwd id="password" {...register("password", { required: true })} />
            </InputPwdWrap>
            <PwdText><a>비밀번호</a></PwdText>
        </Loginbox>

        {/* 로그인*/}
        <Loginbox2 className={show2 ? 'showed2' : ''}>
            <LoginButton type="submit" className={movedDown ? 'moved' : ''}>로그인</LoginButton>
        </Loginbox2>
    </form>
  );
};

export default LoginForm;
