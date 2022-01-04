import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';

export type HeaderPropsType = {
    isAuth: boolean
    login: any
    logout: any
}

const Header = (props: HeaderPropsType) => {

    return (
        <header className={styles.header}>
            <h3 className={styles.title}>Social Network <span>by Andrei Yantsevich</span>
            </h3>

            <div className={styles.loginBlock}>

                {props.isAuth
                    ? <div>Hello, {props.login}! <br/><span onClick={props.logout}
                                                            className={styles.logout}>Logout</span>
                    </div>
                    : <NavLink className={styles.loginLink} to={'/login'}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header;