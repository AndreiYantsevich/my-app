import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';

type PropsType =  {
    login: string | null
    isAuth: boolean
}

const Header: React.FC<PropsType> = React.memo((props) => {
    return (
        <header className={style.header}>
            <div className={style.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
});

export default Header;