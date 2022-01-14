import React from 'react';
import styles from './Users.module.css';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../assets/images/no_profile_image_placeholder.jpg';
import {UserType} from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followUsers: (userId: string) => void
    unfollowUsers: (userId: string) => void
}

export const User: React.FC<PropsType> = ({
                                              user,
                                              followingInProgress,
                                              followUsers,
                                              unfollowUsers
                                          }) => {
    return (
        <div className={styles.item}>
            <div className={styles.colLeft}>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        src={user.photos.small != null ? user.photos.small : userPhoto}
                        alt={user.name}/>
                </NavLink>

                {user.followed
                    ? <button
                        disabled={followingInProgress.some(id => id === +user.id)}
                        onClick={() => unfollowUsers(user.id)}>Unfollow</button> // thunk from userReducer

                    : <button
                        className={styles.btnFollow}
                        disabled={followingInProgress.some(id => id === +user.id)}
                        onClick={() => followUsers(user.id)}>Follow</button> // thunk from userReducer
                }
            </div>
            <div className={styles.colRight}>
                <div className={styles.userInfo}>
                    <h5 className={styles.title}>{user.name}</h5>
                    <p className={styles.text}><i>{user.status}</i></p>
                </div>
            </div>
        </div>
    )
}