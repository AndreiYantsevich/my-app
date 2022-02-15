import React from 'react';
import styles from './SocialLinks.module.css';
import SocialLink from './SocialLink/SocialLink';

const SocialLinks = () => {
    return (
        <section className={styles.socialLinks}>
            <SocialLink link={'https://www.linkedin.com/in/yantsev1ch/'}
                        title="LinkedIn"/>
            <SocialLink link={'https://github.com/yantsev1ch'} title="Github"/>
            <SocialLink link={'https://t.me/yantsev1ch'} title="Telegram"/>
        </section>
    )
}

export default SocialLinks;