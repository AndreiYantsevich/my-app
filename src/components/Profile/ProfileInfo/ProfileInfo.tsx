import React, {ChangeEvent, FC, memo} from 'react';
import style from './ProfileInfo.module.css';
import {ProfilePropsType} from '../Profile';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo: FC<ProfilePropsType> = memo((props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const setMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.updateUserPhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.image}
                     src={props.profile.photos.large || defaultAvatar} alt={'avatar'}/>
                <input type={'file'} onChange={setMainPhoto}/>
                <ProfileStatusWithHooks status={props.status}
                               updateUserStatus={props.updateUserStatus}/>
                <div>
                    about me: {props.profile.aboutMe}
                </div>
                <div>
                    fullName: {props.profile.fullName}
                </div>
                <div>
                    userId: {props.profile.userId}
                </div>
            </div>
        </div>
    );
});

export default ProfileInfo;