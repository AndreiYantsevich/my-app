import React from 'react';
import s from './ProfileInfo.module.css';

export function ProfileInfo() {
    return (
        <div>
            <div className={s.image}>
                <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    );
}