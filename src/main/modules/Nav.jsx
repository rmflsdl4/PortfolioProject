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

const Nav = ({ menuOpen, setMenuOpen }) => {
    const {     // NavLogic 인자값
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
        handleLeftImgClick,
        handleMenuRegiClick,
        handleLoginClick,
        menuLeft,
        showopinionSend,
        handleSettingClick,
        handleLoginText
    } = NavLogic({ setMenuOpen });

    return (
        <div>
            <NavWrapper $menuOpen={menuOpen}>
                <LeftArrowImg onClick={handleLeftImgClick} />
                <MainLogoImg />

                <HideEle $hideMenuElements={hideMenuElements}>
                    <LoginButton className={movedDown ? 'hidden' : ''} onClick={handleLoginClick }>로그인</LoginButton>
                    <MenuHelp className={movedDown ? 'moved' : ''} onClick={handleMenuRegiClick}>GU BOT은 처음이신가요?</MenuHelp>

                    <Menuz showopinionSend={showopinionSend} loginOpen={loginOpen} handleSettingClick={handleSettingClick} />

                    <LoginForm show={show} show2={show2} movedDown={movedDown} />
                </HideEle>

                <RegisterForm showRegi={showRegi} handleLoginText={handleLoginText} />
                <SettingContainer className={show3 ? 'show3' : ''} $isHiding={isHiding}>
                    <SettingIcon3 className={movedUp ? 'moved2' : ''} />
                </SettingContainer>

            </NavWrapper>
            <BG $menuOpen={menuOpen} onClick={menuLeft} />
            <OpinionSendPopUp opinionSend={opinionSend} showopinionSend={showopinionSend} />
        </div>
    );
}

export default Nav;