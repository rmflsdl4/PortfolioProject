// ImageComponents.jsx
import React from 'react';
import styled from 'styled-components';

// 이미지 소스 import
import pic1 from '../image/group-1.png';
import pic2 from '../image/global-1.png';
import pic3 from '../image/global-2.png';
import pic4 from '../image/KREN.png';
import pic5 from '../image/left-arrow-1.png';
import pic6 from '../image/group-2.png';
import pic7 from '../image/group-3.png';
import pic8 from '../image/group-4.png';
import pic9 from '../image/group-5.png';
import pic10 from '../image/group-6.png';
import pic11 from '../image/group-7.png';
import pic12 from '../image/group-8.png';
import pic13 from '../image/group-9.png';
import pic14 from '../image/group-10.png';
import pic15 from '../image/sent-1.png';
import pic16 from '../image/user-4.png';
import pic17 from '../image/x.png';
import pic18 from '../image/announce.png';
import pic19 from '../image/love.png';
import pic20 from '../image/group-10.jpg';
import pic21 from '../image/group-11.png';
import pic22 from '../image/group-12.png';

// 스타일 컴포넌트

export const MainImg = styled.img.attrs({
  src: pic1,
  alt: '광주대학교챗봇',
})`
  width: 271px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LangImg = styled.img.attrs({
  src: pic2,
  alt: '언어',
})`
  width: 30px;
  height: 30px;
`;

export const MenuImg = styled.img.attrs({
  src: pic3,
  alt: '메뉴',
})`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 0;
  margin-right: 50px;
  transform: translate(0, -50%);
  cursor: pointer;
`;

export const KrenImg = styled.img.attrs({
  src: pic4,
  alt: 'KR/EN',
})`
  margin-left: 15px;
`;

export const LeftArrowImg = styled.img.attrs({
  src: pic5,
  alt: '나가기',
})`
  position: absolute;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 20px;
`;

export const MainLogoImg = styled.img.attrs({
  src: pic6,
  alt: '광주대학교챗봇',
})`
  position: absolute;
  margin-top: 30px;
  right: 50%;
  transform: translate(50%, 0%);
`;

export const GuHpImg = styled.img.attrs({
  src: pic7,
  alt: '광주대홈페이지',
})`

`;

export const ScheduleImg = styled.img.attrs({
  src: pic8,
  alt: '학사일정',
})`
  
`;

export const WebMailImg = styled.img.attrs({
  src: pic9,
  alt: '웹메일',
})`
  
`;

export const NuriSysImg = styled.img.attrs({
  src: pic10,
  alt: '누리시스템',
})`
  
`;

export const CertificateImg = styled.img.attrs({
  src: pic11,
  alt: '인터넷증명서',
})`
  
`;

export const OpinionIcon = styled.img.attrs({
  src: pic12,
  alt: '의견보내기',
})`
  cursor: pointer;
`;

export const HelpIcon = styled.img.attrs({
  src: pic13,
  alt: '이용안내',
})`
  
`;

export const SettingIcon = styled.img.attrs({
  src: pic14,
  alt: '설정',
})`
  cursor: pointer;
`;

export const SendImg = styled.img.attrs({
  src: pic15,
  alt: '전송',
})`
  margin-right: 39px;
  cursor: pointer;
`;

export const OpinionIconPopUp = styled.img.attrs({
  src: pic16,
  alt: '의견보내기',
})`
  width: 47px;
  hiehgt: 47px;
`;

export const CloseIcon = styled.img.attrs({
  src: pic17,
  alt: 'X',
})`
  position: absolute;
  top: 10px;
  left: 463px;
  cursor: pointer;
`;

export const Announce = styled.img.attrs({
  src: pic18,
  alt: '알림',
})`
  position: absolute;
  top: 97px;
  left: 20px;
`;

export const Love = styled.img.attrs({
  src: pic19,
  alt: '러브',
})`
  position: absolute;
  top: 368px;
  left: 388px;
`;

export const SettingIcon2 = styled.img.attrs({
  src: pic20,
  alt: '설정',
})`
  cursor: pointer;
`;

export const Profile = styled.img.attrs({
  src: pic21,
  alt: '프로필',
})`
  cursor: pointer;
`;

export const Logout = styled.img.attrs({
  src: pic22,
  alt: '로그아웃',
})`
  cursor: pointer;
`;