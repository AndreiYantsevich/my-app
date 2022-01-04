import React from 'react';
//import styles from './ProfileContact.module.css';

const ProfileContact = (props: ContactType) => {
    return <>
        <p><strong>{props.title}:</strong>{props.value}</p>
    </>
}

export default ProfileContact;


// TYPES
type ContactType = {
    title: string
    value: null | string
}