import React from 'react';
import style from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import axios from 'axios';
import {UserType} from '../../redux/users-reducer';

type UsersPagePropsType = {
    usersState: Array<UserType>
    followUser: (id: number) => void;
    unfollowUser: (id: number) => void;
    setUsers: (users: Array<UserType>) => void;
}

export type UsersStateType = {
    users: Array<UserType>
}

class Users extends React.Component<UsersPagePropsType, {}> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.usersState && this.props.usersState.map(u => {
                            return <div key={u.id}>
                <span>
                    <div className={style.avatar}>
                        <img src={u.photos.small ? u.photos.small : userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollowUser(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.followUser(u.id)
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
}

export default Users