//Navlogic.jsx
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const NavLogic = ({ setMenuOpen }) => {
    // useState를 이용한 boolean 값 초기상태 지정
    const [loginOpen, setLoginOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [hideMenuElements, sethideMenuElements] = useState(false);
    const [showRegi, setShowRegi] = useState(false);
    const [movedDown, setMovedDown] = useState(false);
    const [movedUp, setMovedUp] = useState(false);
    const [opinionSend, setopinionSend] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const [settingHide, setSettingHide] = useState(false);
    const [back, setBack] = useState(false);
    const [showR, setShowR] = useState(false);

    // 쿠키에서 chatAnimation 값을 불러옵니다. 없으면 true로 기본값 설정
    const [chatAnimation, setChatAnimation] = useState(() => {
        const cookieValue = Cookies.get('chatAnimation');
        return cookieValue === 'false' ? false : true;
    });

    // chatAnimation 값이 변경될 때마다 쿠키에 저장
    useEffect(() => {
        Cookies.set('chatAnimation', chatAnimation, { expires: 7 }); // 쿠키는 7일 동안 유효
    }, [chatAnimation]);

    // 애니메이션 스타일 선택
    useEffect(() => {
        if(chatAnimation){
            setShowR(true);
        } else if(!chatAnimation){
            setShowR(false);
        } 
    }, [chatAnimation]);

    // 애니메이션 기존 상태 값
    const [selectedStyle, setSelectedStyle] = useState(() => {
        return Cookies.get('selectedStyle') || '0'; // 쿠키에서 값을 불러오고 기본값은 '0'
    });

    // 상태가 변경될 때마다 쿠키에 저장
    useEffect(() => {
        Cookies.set('selectedStyle', selectedStyle, { expires: 7 }); // 쿠키는 7일 동안 유효
    }, [selectedStyle]);

    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value); // 상태를 업데이트
    };

    const handleLeftImgClick = () => {      // 뒤로가기 버튼
        setBack(true);
    };

    useEffect(() => {   // 뒤로가기 효과 순서
        if (back) {
            setTimeout(() => {
                setSettingHide(false);
            }, 300);
            if (loginOpen) {    // 로그인이 펼쳐져있을 시 접기
                setShow(false);
                setBack(false);
                setTimeout(() => {
                    setShow2(false);
                    setMovedDown(false);
                    setTimeout(() => {
                        setLoginOpen(false);
                    }, 300);
                }, 100);
            } else if (hideMenuElements) {     // 회원가입이 떠있을 때 돌아가기
                setBack(false);
                setShowRegi(false);
                setShow3(false);
                setIsHiding(true);
                setSettingHide(false);
                setTimeout(() => {
                    setMovedUp(false);
                    sethideMenuElements(false);
                    setIsHiding(false);
                }, 300);
            } else {    // 메뉴 여닫기
                setMenuOpen(false);
                setBack(false);
            }
        }
    }, [back]);

    const handleMenuRegiClick = () => {     // 회원가입 버튼
        if (loginOpen) {    // 로그인이 펼쳐져있을 때
            sethideMenuElements(true);
            setTimeout(() => {
                setLoginOpen(false);
                setMovedDown(false);
                setShow(false);
                setShow2(false);
            }, 300);
        } else {    
            sethideMenuElements(true);
        }

        setTimeout(() => {
            setShowRegi(true);
        }, 300);
    };

    const handleLoginClick = () => {    // 로그인 펼치기
        setLoginOpen(true);
    };

    useEffect(() => {   // 로그인 펼치기 효과 순서
        if (loginOpen) {
            setTimeout(() => {
                setMovedDown(true);
                setShow2(true);
            }, 100);
            setTimeout(() => {
                setShow(true);
            }, 300);
        }
    }, [loginOpen]);

    const menuLeft = () => {    // 메뉴 옆의 공백을 클릭 시 메뉴 나가기
        if (loginOpen) {
            setMenuOpen(false);
            setShow(false);
            setTimeout(() => {
                setShow2(false);
                setMovedDown(false);
                setTimeout(() => {
                    setLoginOpen(false);
                }, 300);
            }, 100);
        } else if (hideMenuElements) {
            setShow3(false);
            setIsHiding(true);
            setSettingHide(false);
            setMenuOpen(false);
            setShowRegi(false);
            setTimeout(() => {
                setMovedUp(false);
                sethideMenuElements(false);
                setIsHiding(false);
            }, 300);
        } else {
            setMenuOpen(false);
        }

        // 빠른 조작 시 남아있는 UI 제거를 위한 코드
        setTimeout(() => {
            setSettingHide(false);
        }, 900);
        setTimeout(() => {
            if (loginOpen) {
            setShow(false);
            setTimeout(() => {
                setShow2(false);
                setMovedDown(false);
                setTimeout(() => {
                    setLoginOpen(false);
                }, 300);
            }, 100);
            } else if (hideMenuElements) {
                setShow3(false);
                setIsHiding(true);
                setSettingHide(false);
                setShowRegi(false);
                setTimeout(() => {
                    setMovedUp(false);
                    sethideMenuElements(false);
                    setIsHiding(false);
                }, 300);
            }
        }, 400);
    };

    const showopinionSend = () => {
        setopinionSend(prevState => !prevState);
    }

    const handleSettingClick = () => {
        sethideMenuElements(true);
        setShow3(true);
        setTimeout(() => {
            setMovedUp(true);
        }, 300);
        setTimeout(() => {
            setSettingHide(true);
        }, 800);
    }

    const handleLoginText = () => {
        setShowRegi(false);
        setTimeout(() => {
            sethideMenuElements(false);
            setLoginOpen(true);
        }, 300);
    }

    return {
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
    };
};

export default NavLogic;
