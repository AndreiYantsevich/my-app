import React, {FC, memo} from 'react';
import style from './ProfileInfo.module.css';
import {ProfilePropsType} from '../Profile';
import Preloader from '../../common/Preloader/Preloader';
import defaultAvatar from '../../../assets/images/avatar.png';
import ProfileStatus from './ProfileStatus';

const ProfileInfo: FC<ProfilePropsType> = memo((props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large
                    ? props.profile.photos.large
                    : defaultAvatar}
                     alt={'avatar'}
                />
                <ProfileStatus status={'Hello!'}/>
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