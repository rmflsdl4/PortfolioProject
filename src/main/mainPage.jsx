import React, { useState, useEffect } from "react";
import "./style.css";
import pic1 from './image/group-1.png'
import pic2 from './image/global-1.png'
import pic3 from './image/global-2.png'
import pic4 from './image/KREN.png'
import pic5 from './image/left-arrow-1.png'
import pic6 from './image/group-2.png'
import pic7 from './image/group-3.png'
import pic8 from './image/group-4.png'
import pic9 from './image/group-5.png'
import pic10 from './image/group-6.png'
import pic11 from './image/group-7.png'
import pic12 from './image/group-8.png'
import pic13 from './image/group-9.png'
import pic14 from './image/group-10.png'
import pic15 from './image/sent-1.png'

export default function Application() {
    // 버튼 클릭시 boolean값 변경해주는 코드
    const [menuOpen, setMenuOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [movedDown, setMovedDown] = useState(false)
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [hideLoginElements, setHideLoginElements] = useState(false)
    const [showRegi, setShowRegi] = useState(false)

    const handleMenuHelpClick = () => {
        // 로그인 관련 요소 숨기기
        if(loginOpen){
            setHideLoginElements(true);

            setTimeout(() => {
                setLoginOpen(false);
                setMovedDown(false);
                setShow(false);
                setShow2(false);
            }, 300);
        }
        else if(!loginOpen){
            setHideLoginElements(true);
        }

        setTimeout(() => {
            setShowRegi(true);
        }, 300);
      };

    const handleLoginClick = () => {
        setLoginOpen(true);
    };

    useEffect(() => {
        if (loginOpen) {
            setTimeout(() => {
                setMovedDown(true); // loginActive가 나타난 후에 movedDown을 실행
                setShow2(true);
            }, 100);

            setTimeout(() => {
                setShow(true); // movedDown이 완료된 후에 loginbox를 나타냄
            }, 300);
        }
    }, [loginOpen]);

    const handleLeftImgClick = () => {
        if (loginOpen) {
            // loginOpen이 true일 때는 상태를 초기화
            setShow(false);
            
            setTimeout(() => {
                setShow2(false);
                setMovedDown(false);

                
                setTimeout(() => {
                    setLoginOpen(false);
                }, 300);
            }, 100);
        }
        else if (hideLoginElements) {
            // 회원가입이 진행중일때 나가기
            setShowRegi(false);

            setTimeout(() => {
                setHideLoginElements(false);
            }, 300);
        }
        else if (!loginOpen) {
            // loginOpen이 false일 때는 메뉴 열기/닫기
            setMenuOpen(menuOpen => !menuOpen);
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();  // 기본 동작(폼 제출)을 막습니다.
    
        console.log("로그인 폼 제출");
            // 여기에서 실제 로그인 로직을 추가할 수 있습니다. (예: API 호출, 유효성 검사 등)
        
    };

    return(
        <>
            <div className="header">    {/*맨 위 흰색 바*/}
                <div className="langContainer">     {/*언어 아이콘과 텍스트*/}
                    <img className="langImg" src={pic2} alt="언어" />
                    <img className="krenImg" src={pic4} alt="KR/EN" />
                </div>
                <img className="mainImg" src={pic1} alt="광주대학교챗봇" />     {/*중앙 로고*/}
                <img className="menuImg" src={pic3} alt="메뉴" onClick={() => {setMenuOpen(menuOpen => !menuOpen)}} />      {/*오른쪽 메뉴버튼*/}

            </div>

            <div className="body">      {/*채팅내용이 표시될 곳*/}
            
            </div>

            <div className="footer">
                <input type="text" id="question" placeholder={"라이티에게 궁금한 것을 물어보세요 !"} />
                <img className="sendImg" src={pic15} alt="전송" />
            </div>

            <nav className={menuOpen ? 'active' : ''}>      {/*오른쪽 메뉴*/}
                <img className="leftImg" src={pic5} alt="나가기" onClick={handleLeftImgClick} />    {/*메뉴 나가는 버튼*/}
                <img className="menuMainImg" src={pic6} alt="광주대학교챗봇" />     {/*로고*/}
                <div className={`hideEle ${hideLoginElements ? 'hidden' : ''}`}>
                    <button className={`login ${movedDown ? 'hidden' : ''}`} onClick={handleLoginClick}>로그인</button>      {/*로그인 버튼*/}
                    <a className={`menuHelp ${movedDown ? 'moved' : ''}`} onClick={handleMenuHelpClick}>
                        GU BOT은 처음이신가요?
                    </a>    {/*회원가입 버튼*/}
                    <div className={`menuz ${loginOpen ? 'loginActive' : ''}`}>    {/*로그인 버튼 클릭시 사라질 것들*/}
                        <div className="linkSelect">    {/*링크 바로가기 모음*/}
                            <a href="https://www.gwangju.ac.kr/">
                                <img className="guHp" src={pic7} alt="광주대홈페이지" />
                            </a>
                            <a href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=491">
                                <img className="schedule" src={pic8} alt="학사일정" />
                            </a>
                            <a href="http://mail.gwangju.ac.kr/">
                                <img className="webMail" src={pic9} alt="웹메일" />
                            </a>
                            <a href="https://nuri.gwangju.ac.kr/">
                                <img className="nuriSys" src={pic10} alt="누리시스템" />
                            </a>
                            <a href="https://www.gwangju.ac.kr/page/?site=gwangju&mn=514">
                                <img className="certificate" src={pic11} alt="인터넷증명서" />
                            </a>
                        </div>
                        <div className="menuLine"></div>
                        <div className="menuBottom">    {/*선 아래 3가지의 메뉴*/}
                            <a href="*">
                                <img className="opinion" src={pic12} alt="의견보내기" />
                            </a>
                            <a href="*">
                                <img className="help" src={pic13} alt="이용안내" />
                            </a>
                            <a href="*">
                                <img className="setting" src={pic14} alt="설정" />
                            </a>
                        </div>
                    </div>
                    <div className={`loginbox ${show ? 'showed' : ''}`}>    {/*로그인 버튼 클릭 시 나타날 아이디, 비밀번호 입력칸*/}
                        <input type="text" id="username" />
                        <div className="idText">
                            <a>아이디</a>
                        </div>
                        <input type="password" id="password" />
                        <div className="pwdText">
                            <a>비밀번호</a>
                        </div>
                    </div>
                    <div className={`loginbox2 ${show2 ? 'showed2' : ''}`}>
                        <button className={`login ${movedDown ? 'moved' : ''}`} onClick={handleLoginSubmit}>로그인</button>
                    </div>
                </div>
                <div className={`register ${showRegi ? 'regiShowed' : ''}`}>
                    <input type="text" id="regiUsername" />
                    <div className="regiIdText">
                        <a>아이디</a>
                    </div>
                    <input type="password" id="regiPassword" />
                    <div className="regiPwdText">
                        <a>비밀번호</a>
                    </div>
                    <input type="password" id="regiPwdCheck" />
                    <div className="regiPwdCheckText">
                        <a>비밀번호 확인</a>
                    </div>
                    
                </div>
            </nav>
        </>
        
        
    );
}
