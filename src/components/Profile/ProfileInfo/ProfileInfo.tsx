import React, {ChangeEvent, FC, memo} from 'react';
import style from './ProfileInfo.module.css';
import {ProfilePropsType} from '../Profile';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo: FC<ProfilePropsType> = memo(({
                                                    profile,
                                                    status,
                                                    updateUserStatus,
                                                    updateUserPhoto,
                                                    isOwner
                                                }) => {

    if (!profile) {
        return <Preloader/>
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
                <div>
                    about me: {profile.aboutMe}
                </div>
                <div>
                    fullName: {profile.fullName}
                </div>
                <div>
                    userId: {profile.userId}
                </div>
            </div>
        </div>
    );
});

export default ProfileInfo;