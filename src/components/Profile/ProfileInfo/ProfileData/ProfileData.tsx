import React from 'react';
import ProfileContact from '../ProfileContact/ProfileContact';
import styles from './ProfileData.module.css';
import {ProfileType} from '../../../../types/types';

const ProfileData = (props: ProfileDataType) => {
    return (
        <>
            {props.isOwner &&
                <p className={styles.link} onClick={props.goToEditMode}>Edit Profile</p>}

            <h3 className={styles.subtitle}>{props.profile.fullName}</h3>

            {/*GET EVERY KEY and VALUE FROM OBJECT*/}
            <div className={`${styles.data} ${styles.contacts}`}>
                <strong>Contacts: </strong>
                {Object.keys(props.profile.contacts).map(key => {
                        return <ProfileContact key={key} title={key}
                                               value={(props.profile.contacts as any)[key]}/>
                    }
                )}
            </div>

            <p className={styles.data}><strong>About me: </strong>
                {props.profile.aboutMe !== null ? props.profile.aboutMe : 'no info'}</p>

            <p className={styles.data}><strong>I'm looking for a job: </strong>
                {props.profile.lookingForAJob ? 'yes' : 'no'}</p>

            {props.profile.lookingForAJob &&
                <p className={styles.data}><strong>Job description: </strong>
                    {props.profile.lookingForAJobDescription}
                </p>}
        </>
    )
}

export default ProfileData;


// TYPES
export type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}