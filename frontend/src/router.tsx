import React, {useState, useRef, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button';

import SimpleButton from './components/SimpleButton';
import resStyles from './components/funcs/resStyles.ts';
import useResolutions from './components/hooks/useResolusions.ts';

import styles from './App.module.scss';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import logo512 from './components/img/logo512.png';

import App from './App.tsx';
import SignUp from './SingUp.tsx'
import LogIn from './LogIn.tsx';

function RouterComp() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
  
    const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    /* Определить размер экрана, возвращает true/false */
    const {isBigScreen, isMidScreen, isSmallScreen, isPhone} = useResolutions()


    /* ФУНКЦИИ ДЛЯ МОБИЛЬНОГО МЕНЮ */
    const handleClickBurger = () => {
        clearTimeout(menuTimeoutRef.current!);
        setMenuVisible(!menuVisible);
    };

    const handleHideMenu = (event:any) => {
        if(isSmallScreen || isPhone) {
            const clickedElementClass = [...event.target.classList];
            const array: string[] = clickedElementClass.filter((className: string) => className === 'click_detect');
            if(array.length > 0) return;

            clearTimeout(menuTimeoutRef.current!);
            setMenuVisible(false);
        }
    }

    const handleMouseEnter = () => {
        clearTimeout(menuTimeoutRef.current!);
        setMenuVisible(true);
    };

    const handleMouseLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
        setMenuVisible(false);
        }, 3000);
    };

    const hideMenu = () => {
        setMenuVisible(false);
    };
  
    /* Отследить скрол в странице, чтобы к хедеру применились стили затемнения */
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 0 && !isScrolled) {
            setIsScrolled(true);
        } else if (scrollTop === 0 && isScrolled) {
            setIsScrolled(false);
        };
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    return (
        <div onClick={handleHideMenu}>
            {/* Хедер сайта */}

            <div className={`${styles.header} ${styles[resStyles('header', {isBigScreen,isMidScreen,isSmallScreen,isPhone})]} ${isScrolled ? styles.dark_header : ''}`}>
                <div className={styles.header_container}>
                <div className={styles.logo_container}>
                    <a href='/' className={styles.logoLink}>
                    <img src={logo512} className={`${styles.logo512} ${styles.logo}`} alt="Logo" />
                    </a>Storm Shop
                </div>
                <MediaQuery maxWidth={920}>
                    <SimpleButton className='click_detect' isGold={true} sx={{
                        fontSize: '25px',
                        fontWeight: '900'
                    }} onClick={handleClickBurger}>
                    ☰
                    </SimpleButton>
                </MediaQuery>
                <MediaQuery minWidth={920}>
                    <div className={styles.header_options_container}>
                        <SimpleButton isGold={true}>Купить</SimpleButton>
                        <SimpleButton isGold={true}>Заказать Бота</SimpleButton>
                        <SimpleButton>Помощь</SimpleButton>
                        <SimpleButton>Хочу заработать!</SimpleButton>
                    </div>
                </MediaQuery>
                </div>
            </div>

            {/* Бургер меню, для мобильных устройств */}

            <div
                ref={menuRef}
                style={{ display: menuVisible ? 'flex' : 'none' }}
                className={styles.burger_menu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <SimpleButton isGold={true} className={styles.burger_item}>Купить</SimpleButton>
                <SimpleButton isGold={true} className={styles.burger_item}>Заказать Бота</SimpleButton>
                <SimpleButton className={styles.burger_item}>Помощь</SimpleButton>
                <SimpleButton className={styles.burger_item}>Хочу заработать!</SimpleButton>
            </div>

            {/* Роуты */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/*" element={<App />} />
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/login" element={<LogIn />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
 
export default RouterComp;