//Navlogic.jsx
import { useState, useEffect } from 'react';

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

    const handleLeftImgClick = () => {      // 뒤로가기 버튼
        if (loginOpen) {    // 로그인이 펼쳐져있을 시 접기
            setShow(false);
            setTimeout(() => {
                setShow2(false);
                setMovedDown(false);
                setTimeout(() => {
                    setLoginOpen(false);
                }, 300);
            }, 100);
        } else if (hideMenuElements) {     // 회원가입이 떠있을 때 돌아가기
            setShowRegi(false);
            setShow3(false);
            setIsHiding(true);
            setTimeout(() => {
                setMovedUp(false);
                sethideMenuElements(false);
                setIsHiding(false);
            }, 300);
        } else {    // 메뉴 여닫기
            setMenuOpen(prevState => !prevState);
        }
    };

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
            setMenuOpen(prevState => !prevState);
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
            setMenuOpen(prevState => !prevState);
            setShowRegi(false);
            setTimeout(() => {
                setMovedUp(false);
                sethideMenuElements(false);
                setIsHiding(false);
            }, 300);
        } else {
            setMenuOpen(prevState => !prevState);
        }
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
        handleLeftImgClick,
        handleMenuRegiClick,
        handleLoginClick,
        menuLeft,
        showopinionSend,
        handleSettingClick,
        handleLoginText
    };
};

export default NavLogic;
