import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import {UserType} from '../../redux/users-reducer';

type UsersPropsType = {
    users: Array<UserType>
    followUser: (id: number) => void;
    unfollowUser: (id: number) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Users = (props: UsersPropsType) => {

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
                    <div className={style.avatar}>
                        <img src={u.photos.small ? u.photos.small : userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollowUser(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.followUser(u.id)
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
};

export default Users;