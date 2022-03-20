import React from 'react';
import ProfileContact from '../ProfileContact/ProfileContact';
import styles from './ProfileData.module.css';
import {ContactsType, ProfileType} from '../../../../types/types';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            {isOwner &&
                <p className={styles.link} onClick={goToEditMode}>Edit Profile</p>}

            <h3 className={styles.subtitle}>{profile.fullName}</h3>

            {/*GET EVERY KEY and VALUE FROM OBJECT*/}
            <div className={`${styles.data} ${styles.contacts}`}>
                <strong>Contacts: </strong>
                {Object.keys(profile.contacts).map(key => {
                        return <ProfileContact key={key} title={key}
                                               value={profile.contacts[key as keyof ContactsType]}/>
                    }
                )}
            </div>

            <p className={styles.data}><strong>About me: </strong>
                {profile.aboutMe !== null ? profile.aboutMe : 'no info'}</p>

            <p className={styles.data}><strong>I'm looking for a job: </strong>
                {profile.lookingForAJob ? 'yes' : 'no'}</p>

            {profile.lookingForAJob &&
                <p className={styles.data}><strong>Job description: </strong>
                    {profile.lookingForAJobDescription}
                </p>}
        </>
    )
}

export default ProfileData;

