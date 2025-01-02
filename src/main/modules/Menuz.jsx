//Menuz.jsx
import React from 'react';
import styled from 'styled-components';
import { GuHpImg, ScheduleImg, WebMailImg, NuriSysImg, CertificateImg, OpinionIcon, HelpIcon, SettingIcon } from './ImageComponents';

// 스타일 컴포넌트
const MenuzDiv = styled.div`
    width: 338px;
    top: 0%;
    right: 0%;
    transition: 0.3s;

    &.loginActive {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }
`;

const LinkSelect = styled.div`
  position: absolute;
  top: 400px;
  left: 45px;
  width: 216px;
  display: block;
`;

const LinkItem = styled.a`
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MenuLine = styled.div`
  position: absolute;
  top: 690px;
  width: 338px;
  border: 0px;
  border-top: 1px solid #004e2b;
  opacity: 50%;
  box-shadow: 0px 0px 3px gray;
`;

const MenuBottom = styled.div`
  position: absolute;
  top: 712px;
  left: 45px;
  width: 143px;
`;

const BottomMenuItem = styled.a`
  display: block;
  margin-bottom: 20px;
`;

//단순 링크 메뉴
const MenuLinks = () => {
  return (
    <>
      <LinkSelect>
            <LinkItem href="https://www.gwangju.ac.kr/">
                <GuHpImg />
            </LinkItem>
            <LinkItem href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=491">
                <ScheduleImg />
            </LinkItem>
            <LinkItem href="http://mail.gwangju.ac.kr/">
                <WebMailImg />
            </LinkItem>
            <LinkItem href="https://nuri.gwangju.ac.kr/">
                <NuriSysImg />
            </LinkItem>
            <LinkItem href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=514">
                <  CertificateImg />
            </LinkItem>
      </LinkSelect>
      <MenuLine />
    </>
  );
};

//하단 메뉴
const MenuBottomSection = ({ showopinionSend, handleSettingClick }) => {
  return (
    <MenuBottom>
        <BottomMenuItem onClick={showopinionSend}>
            <OpinionIcon />
        </BottomMenuItem>
        <BottomMenuItem href="#">
            <HelpIcon />
        </BottomMenuItem>
        <BottomMenuItem onClick={handleSettingClick}>
            <SettingIcon />
        </BottomMenuItem>
    </MenuBottom>
  );
};

const Menuz = ({ showopinionSend, loginOpen, handleSettingClick }) => {
    return (
        <MenuzDiv className={loginOpen ? 'loginActive' : ''}>
            <MenuLinks />
            <MenuBottomSection showopinionSend={showopinionSend} handleSettingClick={handleSettingClick} />
        </MenuzDiv>
    );
};

export default Menuz;
