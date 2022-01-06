import React from 'react';
import styles from './ProfileContact.module.css';

type PropsType = {
    title: string
    value: null | string
}

const ProfileContact: React.FC<PropsType> = ({title, value}) => {
    return <>
        <p className={styles.contacts}><strong>{title}:</strong>{value}</p>
    </>
}

export default ProfileContact;

