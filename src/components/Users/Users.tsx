import axios from 'axios';
import React from 'react';
import style from './Users.module.css'
import {UserType} from '../../redux/users-reducer';
import userPhoto from '../../assets/images/avatar.png'

type PropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    users: UserType[]
    setUsers: (users: UserType[]) => void
}

export function Users(props: PropsType) {
    let getUsers = () => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }
    }
    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {props.users.map(u => {
                return <div key={u.id}>
                <span>
                    <div className={style.avatar}>
                        <img src={u.photos.small ? u.photos.small : userPhoto}/>
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
                    {/*<span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>*/}
                </span>
                    </div>
                }
            )}
        </div>
    );
}