import React from 'react';
import styles from './Nav.module.css';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to="/profile" className={styles.link}
                     activeClassName={styles.activeLink}>Profile</NavLink>
            <NavLink to="/dialogs" className={styles.link}
                     activeClassName={styles.activeLink}>Dialogs</NavLink>
            <NavLink to="/users" className={styles.link}
                     activeClassName={styles.activeLink}>Users</NavLink>
            <NavLink to="/news" className={styles.link}
                     activeClassName={styles.activeLink}>News</NavLink>
            <NavLink to="/music" className={styles.link}
                     activeClassName={styles.activeLink}>Music</NavLink>
            <NavLink to="/friends" className={styles.link}
                     activeClassName={styles.activeLink}>Friends</NavLink>
        </nav>
    )
}

export default Nav;