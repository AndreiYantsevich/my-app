import React from 'react';
import styles from './SocialLink.module.css';

type Props = {
    link: string,
    title: string
}

const SocialLink = ({link, title}: Props) => {
    return (
        <div className={styles.socialLink}>
            <a className={styles.link} href={link} target="_blank"
               rel="noopener noreferrer">{title}</a>
        </div>
    )
}

export default SocialLink;