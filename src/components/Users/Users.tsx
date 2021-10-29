import React, {FC} from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../store/reducers/users-reducer';
import axios from 'axios';

interface PropsType {
    users: Array<UserType>
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
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
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "7e5b4528-2880-4677-b629-b878b7697787"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id);
                                        }
                                    });
                            }}>Unfollow</button>
                            : <button onClick={() => {

                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "7e5b4528-2880-4677-b629-b878b7697787"
                                    }
                                })
                                    .then(response => {
                                       if (response.data.resultCode === 0) {
                                           props.follow(u.id);
                                       }
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
};

export default Users;