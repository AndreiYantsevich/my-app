import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';
import {toggleFollowingProgress, UserType} from '../../store/reducers/users-reducer';
import {followAPI} from '../../api/api';

type PropsType = {
    users: Array<UserType>
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

const Users: React.FC<PropsType> = React.memo((props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? style.selectedPage : ''}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small ? u.photos.small : userPhoto}
                             className={style.avatar} alt={'avatar'}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id);
                                followAPI.unfollowUsers(u.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.unfollow(u.id);
                                    }
                                    props.toggleFollowingProgress(false, u.id);
                                });
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id);
                                followAPI.followUsers(u.id).then(data => {
                                    if (data.resultCode === 0) {
                                        props.follow(u.id);
                                    }
                                    props.toggleFollowingProgress(false, u.id);
                                });
                            }}>Follow</button>}
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                </span>
                    </div>
                )}
        </div>
    );
});

export default Users;