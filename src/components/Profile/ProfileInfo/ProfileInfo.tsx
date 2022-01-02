import React, {ChangeEvent, FC, memo, useState} from 'react';
import style from './ProfileInfo.module.css';
import {ProfilePropsType} from '../Profile';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm';

const ProfileInfo: FC<ProfilePropsType> = memo(({
                                                    profile,
                                                    status,
                                                    updateUserStatus,
                                                    updateUserPhoto,
                                                    isOwner
                                                }) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            updateUserPhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.image}
                     src={profile.photos.large || defaultAvatar} alt={'avatar'}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status}
                                        updateUserStatus={updateUserStatus}/>
                {editMode ? <ProfileDataForm profile={profile}/> : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>}
            </div>
        </div>
    );
});

export default ProfileInfo;