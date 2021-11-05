import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar: React.FC = React.memo(() => {
    return (
        <nav className={style.nav}>
            <div className={`${style.item} ${style.active}`}>
                <NavLink to={'/profile'} activeClassName={style.active}>Profile</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/users'} activeClassName={style.active}>Users</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/dialogs'} activeClassName={style.active}>Messages</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/news'} activeClassName={style.active}>News</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/music'} activeClassName={style.active}>Music</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/settings'} activeClassName={style.active}>Settings</NavLink>
            </div>
        </nav>
    );
});

export default Navbar;