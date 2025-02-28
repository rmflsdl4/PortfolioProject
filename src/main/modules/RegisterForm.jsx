import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ProcessRegister } from "./ProcessRegister.jsx";

// 오류 메시지 스타일
const ErrorText = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
    max-width: 274px;
    white-space: normal;
    margin: 0;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 240px;
`;

const InputWrap = styled.div`
    position: relative;
    border: 1px solid #004e2b;
    border-radius: 5px;
    opacity: 85%;
    width: 274px;
    height: 53px;
    margin-top: 30px;  // 각 필드 간 간격을 30px로 설정 (margin-bottom에서 margin-top으로 변경)
    display: flex;
    flex-direction: column;
`;

const InputIdWrap = styled(InputWrap)``;
const InputPwdWrap = styled(InputWrap)``;
const InputPwdChkWrap = styled(InputWrap)``;
const InputMailWrap = styled(InputWrap)``;
const InputNameWrap = styled(InputWrap)``;
const SelectWrap = styled(InputWrap)``;
const InputBirthWrap = styled(InputWrap)``;

const Input = styled.input`
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
`;

const InputRegiId = styled(Input)``;
const InputRegiPwd = styled(Input).attrs({ type: 'password' })``;
const InputRegiPwdChk = styled(Input).attrs({ type: 'password' })``;
const InputRegiMail = styled(Input)``;
const InputRegiName = styled(Input)``;
const InputBirth = styled(Input).attrs({ type: 'date' })``;

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

const CustomSelect = styled.select`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
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
    width: 274px;
    height: 64px;
    background-color: #26684B;
    border: 0px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
`;

const LoginText = styled.a`
    color: #757575;
    font-size: 15px;
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
    margin-top: 15px;
`;

const IdText = styled.div`
    position: absolute;
    font-size: 12px;
    color: #004e2b;
    font-weight: bold;
    top: -10px;
    left: 40px;
    background-color: #ffffff;
`;

const RegisterForm = ({ showRegi, handleLoginText }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitted } } = useForm();

    const onSubmit = (data) => {
        if (data.regiPassword !== data.regiPwdCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        ProcessRegister(data, reset);
    };

    return (
        <Register className={showRegi ? 'regiShowed' : ''}>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* 아이디 입력 */}
                    <InputIdWrap>
                        <IdText>아이디</IdText>
                        <InputRegiId
                            id="regiUsername"
                            {...register('regiUsername', {
                                required: "아이디를 입력하세요.",
                                pattern: {
                                    value: /^[a-z][a-z0-9]{5,23}$/,
                                    message: "6~24자의 영어 소문자, 숫자만 가능합니다."
                                }
                            })}
                        />
                    </InputIdWrap>
                    {errors.regiUsername && isSubmitted && <ErrorText>{errors.regiUsername.message}</ErrorText>}

                    {/* 비밀번호 입력 */}
                    <InputPwdWrap>
                        <IdText>비밀번호</IdText>
                        <InputRegiPwd
                            id="regiPassword"
                            {...register('regiPassword', {
                                required: "비밀번호를 입력하세요.",
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/,
                                    message: "영문, 숫자, 특수문자(!@#$%^&*) 포함 8~24자로 입력하세요."
                                }
                            })}
                        />
                    </InputPwdWrap>
                    {errors.regiPassword && isSubmitted && <ErrorText>{errors.regiPassword.message}</ErrorText>}

                    {/* 비밀번호 확인 */}
                    <InputPwdChkWrap>
                        <IdText>비밀번호 확인</IdText>
                        <InputRegiPwdChk
                            id="regiPwdCheck"
                            {...register('regiPwdCheck', { required: "비밀번호 확인을 입력하세요." })}
                        />
                    </InputPwdChkWrap>
                    {errors.regiPwdCheck && isSubmitted && <ErrorText>{errors.regiPwdCheck.message}</ErrorText>}

                    {/* 이메일 입력 */}
                    <InputMailWrap>
                        <IdText>이메일</IdText>
                        <InputRegiMail
                            id="regiMail"
                            {...register('regiMail', {
                                required: "이메일을 입력하세요.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "올바른 이메일 형식이 아닙니다."
                                }
                            })}
                        />
                    </InputMailWrap>
                    {errors.regiMail && isSubmitted && <ErrorText>{errors.regiMail.message}</ErrorText>}

                    {/* 이름 입력 */}
                    <InputNameWrap>
                        <IdText>이름</IdText>
                        <InputRegiName
                            id="regiName"
                            {...register('regiName', {
                                required: "이름을 입력하세요.",
                                pattern: {
                                    value: /^[가-힣a-zA-Z]+$/,
                                    message: "한글과 영어만 입력 가능합니다."
                                }
                            })}
                        />
                    </InputNameWrap>
                    {errors.regiName && isSubmitted && <ErrorText>{errors.regiName.message}</ErrorText>}

                    {/* 성별 선택 */}
                    <SelectWrap>
                        <IdText>성별</IdText>
                        <CustomSelect id="sex" {...register('sex', { required: "성별을 선택하세요." })}>
                            <option value="">눌러서 선택하세요</option>
                            <option value="0">남</option>
                            <option value="1">여</option>
                        </CustomSelect>
                    </SelectWrap>
                    {errors.sex && isSubmitted && <ErrorText>{errors.sex.message}</ErrorText>}

                    {/* 생년월일 입력 */}
                    <InputBirthWrap>
                        <IdText>생년월일</IdText>
                        <InputBirth
                            id="birth"
                            {...register('birth', { required: "생년월일을 입력하세요." })}
                        />
                    </InputBirthWrap>
                    {errors.birth && isSubmitted && <ErrorText>{errors.birth.message}</ErrorText>}

                    <RegiButton type="submit">회원가입</RegiButton>
                </form>
                <LoginText onClick={handleLoginText}>이미 계정이 있으신가요?</LoginText>
            </FormContainer>
        </Register>
    );
};

export default RegisterForm;
