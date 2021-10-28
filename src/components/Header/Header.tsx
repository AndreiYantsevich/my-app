import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';

type PropsType = {
    login: string | null
    isAuth: boolean
    avatar: string
}

const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <img src={props.avatar} alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
}

export default Header;