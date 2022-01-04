import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import noUserImage from '../../../assets/images/no_profile_image_placeholder.jpg';
import Preloader from '../../common/Preloader/Preloader';
import {ProfileComponentType} from '../Profile';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';
import {ProfileType} from '../../../types/types';


const ProfileInfo = (props: ProfileComponentType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    if (!props.profile) {
        return <Preloader/>
    } else {

        // callback to change main avatar photo
        const onImgSelected = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                props.savePhoto(e.target.files[0])
            }
        }

        const onSubmit = (formData: ProfileType) => {
            // TS TYPE for Promise<ProfileType>
            (props.saveProfile(formData) as any).then(
                () => {
                    setEditMode(false)
                }
            )
        }

        return (
            <div className={styles.profileInfo}>
                <div className={styles.banner}>
                    <img className={styles.img}
                         src={props.profile.photos.large || noUserImage}
                         alt={props.profile.fullName}/>
                </div>
                <div className={styles.content}>

                    <ProfileStatusWithHooks status={props.status}
                                            updateStatus={props.updateUserStatus}/>

                    {editMode
                        ? <ProfileDataForm initialValues={props.profile}
                                           profile={props.profile} onSubmit={onSubmit}/>
                        : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                       goToEditMode={() => setEditMode(true)}/>}

                    {/*CHANGE PROFILE PHOTO*/}
                    <p className={styles.data}><strong>Change profile
                        photo: </strong>{props.isOwner &&
                        <input type="file" onChange={onImgSelected}/>}</p>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;


