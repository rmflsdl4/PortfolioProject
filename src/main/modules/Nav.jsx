//Nav.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {    // 이미지 임포트
    LeftArrowImg,
    MainLogoImg,
    SettingIcon2
} from './ImageComponents';
import NavLogic from './NavLogic';
import Menuz from './Menuz';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OpinionSendPopUp from './OpinionSendPopUp';
import { Profile, Logout } from './ImageComponents';

// 스타일 컴포넌트
const BG = styled.div`
    transition: 0.5s;
    opacity: ${props => props.$menuOpen ? '1' : '0'};
    pointer-events: ${props => props.$menuOpen ? 'auto' : 'none'};
    visibility: ${props => props.$menuOpen ? 'visible' : 'hidden'};
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const NavWrapper = styled.nav`
    margin-right: ${props => props.$menuOpen ? '0px' : '-338px'};
    position: fixed;
    height: 100vh;
    width: 338px;
    top: 0%;
    right: 0%;
    background-color: #ffffff;
    z-index: 1010;
    overflow-y: overlay;
    overflow-x: hidden;
    transition: margin-right 0.5s;

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

const HideEle = styled.div`
    transition: 0.3s;
    opacity: ${props => props.$hideMenuElements ? '0' : '1'};
    pointer-events: ${props => props.$hideMenuElements ? 'none' : 'auto'};
    visibility: ${props => props.$hideMenuElements ? 'hidden' : 'visible'};
`;

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
    &.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        top: 400px;
    }
`;

const MenuHelp = styled.a`
    position: absolute;
    width: 168px;
    top: 325px;
    right: 50%;
    transform: translate(50%, 0%);
    color: #757575;
    font-size: 15px;
    text-decoration: underline;
    text-underline-position : under;
    cursor: pointer;
    transition: top 0.5s ease-in-out;

    &.moved {
        top: 490px;
    }
`;

const SettingContainer = styled.div`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: ${({ $isHiding }) => ($isHiding ? '0.3s' : '0s')};

    &.show3 {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;

const SettingIcon3 = styled(SettingIcon2)`
    position: absolute;
    top: 828px;
    left: 45px;
    transition: 0.5s;

    &.moved2{
        top: 283px;
    }
`;

const SettingContainer2 = styled.div`
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;

    &.settingHide {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
`;

const SettingText = styled.a`
    position: absolute;
    top: 349px;
    left: 42px;
    width: 150px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    color: #004E2B;
    font-weight: bold;
`;

const SettingToggleContainer = styled.div`
    position: absolute;
    top: 353px;
    left: 198px;
`;

const SettingAnime = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;
`;

const SettingLabel = styled.label.attrs({
    htmlFor: 'anime'
})`
    position: relative;
    display: block;
    width: 36px;
    height: 20px;
    background-color: #B3CAC0;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
    }
    
    /* 토글 ON일 때 배경색 변경 */
    ${SettingAnime}:checked + & {
        background-color: #004E2B;
    }

    /* 토글 ON일 때 버튼 위치 변경 */
    ${SettingAnime}:checked + &::before {
        transform: translateX(16px);
    }
`;

const RadioGroupContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
    position: absolute;
    top: 386px;
    left: 40px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;

    &.showR {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
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

const LoginSelect = styled.div`
  position: absolute;
  top: 260px;
  left: 45px;
  width: 216px;
  display: block;
`;

const LoginItem = styled.a`
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MenuLine = styled.div`
  position: absolute;
  top: 380px;
  width: 338px;
  border: 0px;
  border-top: 1px solid #004e2b;
  opacity: 50%;
  box-shadow: 0px 0px 3px gray;
`;

const Nav = ({ menuOpen, setMenuOpen }) => {
    const {     
        loginOpen,
        show,
        show2,
        show3,
        hideMenuElements,
        showRegi,
        movedDown,
        movedUp,
        opinionSend,
        isHiding,
        settingHide,
        chatAnimation,
        showR,
        selectedStyle,
        setChatAnimation,
        handleLeftImgClick,
        handleMenuRegiClick,
        handleLoginClick,
        menuLeft,
        showopinionSend,
        handleSettingClick,
        handleLoginText,
        handleStyleChange,
    } = NavLogic({ setMenuOpen });

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }   
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        setUserId(null);
        window.location.reload();
    };

    return (
        <div>
            <NavWrapper $menuOpen={menuOpen}>
                <LeftArrowImg onClick={handleLeftImgClick} />
                <MainLogoImg />

                <HideEle $hideMenuElements={hideMenuElements}>
                    {/* 로그인 상태 확인 */}
                    {userId ? (
                        <>
                            <LoginSelect>
                                <LoginItem href="#" onClick={() => alert("회원정보 Nav 연결 예정")}>
                                    <Profile />
                                </LoginItem>
                                <LoginItem onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                    <Logout />
                                </LoginItem>
                            </LoginSelect>
                            <MenuLine />
                        </>
                    ) : (
                        <>
                            <LoginButton className={movedDown ? 'hidden' : ''} onClick={handleLoginClick}>로그인</LoginButton>
                            <MenuHelp className={movedDown ? 'moved' : ''} onClick={handleMenuRegiClick}>GU BOT은 처음이신가요?</MenuHelp>
                        </>
                    )}

                    <Menuz showopinionSend={showopinionSend} loginOpen={loginOpen} handleSettingClick={handleSettingClick} />
                    <LoginForm show={show} show2={show2} movedDown={movedDown} />
                </HideEle>

                <RegisterForm showRegi={showRegi} handleLoginText={handleLoginText} />

                <>
                    <SettingContainer className={show3 ? 'show3' : ''} $isHiding={isHiding}>
                        <SettingIcon3 className={movedUp ? 'moved2' : ''} />
                    </SettingContainer>

                    <SettingContainer2 className={settingHide ? 'settingHide' : ''}>
                        <SettingText>채팅 애니메이션</SettingText>
                        <SettingToggleContainer>
                            <SettingAnime
                                id="anime"
                                checked={chatAnimation}
                                onChange={() => setChatAnimation(prev => !prev)} 
                            />
                            <SettingLabel />
                        </SettingToggleContainer>
                        <RadioGroupContainer className={showR ? 'showR' : ''}>
                            <CustomRadioButton>
                                <input
                                    type="radio"
                                    name="style"
                                    value="0"
                                    checked={selectedStyle === '0'}
                                    onChange={handleStyleChange}
                                />
                                스타일 1
                            </CustomRadioButton>
                            <CustomRadioButton>
                                <input
                                    type="radio"
                                    name="style"
                                    value="1"
                                    checked={selectedStyle === '1'}
                                    onChange={handleStyleChange}
                                />
                                스타일 2
                            </CustomRadioButton>
                        </RadioGroupContainer>
                    </SettingContainer2>
                </>
            </NavWrapper>
            <BG $menuOpen={menuOpen} onClick={menuLeft} />
            <OpinionSendPopUp opinionSend={opinionSend} showopinionSend={showopinionSend} />
        </div>
    );
};

export default Nav;