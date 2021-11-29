import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css';
import {HeaderPropsType} from './HeaderContainer';

const Header: FC<HeaderPropsType> = memo((props) => {

    return (
        <header className={style.header}>
            <div className={style.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>
                        Log Out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
});

export default Header;