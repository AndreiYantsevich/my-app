import React, {FC, memo} from 'react';
import style from './Users.module.css';
import defaultPhoto from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../types/types';

type PropsType = {
    user: UserType;
    followingInProgress: Array<number>;
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
}

const User: FC<PropsType> = memo(({
                                      user,
                                      follow,
                                      followingInProgress,
                                      unfollow
                                  }) => {
        return (
            <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                src={user.photos.small != null ? user.photos.small : defaultPhoto}
                                className={style.avatar}
                                alt={'avatar'}
                            />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                            : <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                </span>
            </div>
        )
    }
);


export default User;