//OpinionSendPopUp
import React, { useState } from 'react';
import styled from 'styled-components';
import {    // 이미지 임포트
    OpinionIconPopUp,
    CloseIcon,
    Announce,
    Love
} from './ImageComponents';

// 스타일 컴포넌트
const BG = styled.div`
    transition: 0.3s;
    opacity: ${props => props.$opinionSend ? '1' : '0'};
    pointer-events: ${props => props.$opinionSend ? 'auto' : 'none'};
    visibility: ${props => props.$opinionSend ? 'visible' : 'hidden'};
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1100;
`;

const PopUp = styled.div`
    transition: 0.3s;
    opacity: ${props => props.$opinionSend ? '1' : '0'};
    pointer-events: ${props => props.$opinionSend ? 'auto' : 'none'};
    visibility: ${props => props.$opinionSend ? 'visible' : 'hidden'};
    width: 490px;
    height: 490px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1101;
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 36px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const DT = styled.a`
    font-size: 25px;
    font-weight: bold;
    color: #004E2B;
    margin-left: 16px;
`;

const Line = styled.div`
    width: 410px;
    border: 1px solid #004E2B;
    position: absolute;
    top: 92px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const SendOpinionContainer = styled.div`
    width: 274px;
    height: 126px;
    border: 1px solid #407A60;
    border-radius: 5px;
    position: absolute;
    top: 148px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const SendOpinion = styled.textarea`
    width: 264px;
    height: 116px;
    border: 0;
    resize: none;
    font-family: 'Kanit', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
    padding: 0;

    &:focus {
        outline: none;
    }

    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
        cursor: default;
    }

    &::-webkit-scrollbar-thumb {
        outline: none;
        border-radius: 10px;
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.5);
        cursor: default;
    }

    &::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
        cursor: default;
    }

    &::-webkit-scrollbar-track {
        box-shadow: none;
        background-color: transparent;
        cursor: default;
    }
`;

const CharCount = styled.div`
    position: absolute;
    bottom: -18px;
    right: 0;
    font-size: 12px;
    color: #407A60;
    font-weight: bold;
    font-family: 'Kanit', sans-serif;
`;

const ContentText = styled.div`
    background-color: #ffffff;
    position: absolute;
    top: 136px;
    left: 136px;
    width: 28px;
    height: 18px;
    text-align: center;

    a{
        font-size: 12px;
        font-weight: bold;
        color: #407A60;
    }
`;

const Submit = styled.button`
    width: 274px;
    height: 64px;
    border: 0;
    border-radius: 5px;
    position: absolute;
    top: 316px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #26684B;
    cursor:pointer;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const RadioGroupContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    width: 169px;
    position: absolute;
    top: 114px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const CustomRadioButton = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 17px;
    color: #004E2B;
    font-weight: bold;

    input[type='radio'] {
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid #004E2B;
        margin-right: 8px;
        transition: background-color 0.2s ease;
        cursor: pointer;

        &:checked {
            background-color: #004E2B;
            border-color: #004E2B;
        }
    }
`;

const OpinionSendPopUp = ({ opinionSend, showopinionSend }) => {
    // 글자 수 상태 추가
    const [charCount, setCharCount] = useState(0);
    const [textValue, setTextValue] = useState(''); // 상태로 textarea 값 저장

    // 최대 200자로 제한
    const handleInputChange = (e) => {
        let newValue = e.target.value; // 입력 이벤트에서 가져온 값
        if (newValue.length > 200) {
            newValue = newValue.slice(0, 200); // 200자를 초과하면 앞부분 자르기
        }
        setTextValue(newValue);
        setCharCount(newValue.length);
    };

    const [opinion, setOpinion] = useState('like'); //radio 기본값

    const handleOpinionChange = (e) => {
        setOpinion(e.target.value);
    };

    //submit 클릭 시
    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 동작 방지
        if (textValue.trim() === '') { // 텍스트 영역이 비어있을 때
            alert('내용을 입력해주세요.'); // 경고 메시지
            return; // 함수 실행 중단
        }
        
        alert('정상적으로 제출되었습니다.');
        console.log('Content :', textValue);
        console.log('radio :', opinion);
        setTextValue(''); // 폼 제출 후 입력값 초기화
        setCharCount(0);
    };

    return (
        <div>
            <BG $opinionSend={opinionSend}/>
            <PopUp $opinionSend={opinionSend}>
                <CloseIcon onClick={showopinionSend} />
                <LogoContainer>
                    <OpinionIconPopUp />
                    <DT>의견 보내기</DT>
                </LogoContainer>
                <Line />
                <Announce />
                <Love />

                {/* 내용 적는 부분 */}
                <SendOpinionContainer>
                    <SendOpinion 
                        value={textValue} 
                        onChange={handleInputChange} 
                    />
                    <CharCount>{charCount} / 200</CharCount>
                </SendOpinionContainer>
                <ContentText><a>내용</a></ContentText>
                <Submit type="submit" onClick={handleSubmit}>의견 보내기</Submit>

                {/* 좋아요와 싫어요 선택 UI */}
                
            </PopUp>
        </div>
        
    );
}

export default OpinionSendPopUp;