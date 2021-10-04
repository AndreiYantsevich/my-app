import React, {FC} from 'react';
import s from './Header.module.css';

const Header: FC = () => {
    return (
        <header className={s.header}>
            <img src="https://assets.turbologo.com/blog/en/2019/11/19084834/gaming-logo-cover.jpg" alt="logo"/>
        </header>
    );
}

export default Header