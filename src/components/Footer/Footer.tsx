import React from 'react';
import styles from './Footer.module.css';
import SocialLinks from './SocialLinks/SocialLinks';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <SocialLinks/>
            <p className={styles.copyright}>© Created by Andrey Yantsevich</p>
        </div>
    )
}

export default Footer;