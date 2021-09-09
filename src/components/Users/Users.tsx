import React from 'react';
import {UserType} from '../../redux/users-reducer';

type PropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    users: UserType[]
}

export function Users(props: PropsType) {
    return (
        <div>
            {props.users.map(u => {
                return <div key={u.id}>
                <span>
                    <div>
                        <img/>
                    </div>
                    <div>
                        <button>
                            Follow
                        </button>
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
                    </div>
                }
            )}
        </div>
    );
}