import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from '../Profile';
import Preloader from '../../common/Preloader/Preloader';

export function ProfileInfo(props: ProfilePropsType) {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.image}>
                <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
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
}