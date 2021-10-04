import React, {FC} from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../store/reducers/users/users-types';

interface PropsType {
    users: Array<UserType>
    follow: (payload: number) => void;
    unfollow: (payload: number) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (payload: number) => void
}

const Users: FC<PropsType> = (props) => {

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
                             className={style.avatar}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
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