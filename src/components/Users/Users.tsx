import React, {FC, memo} from 'react';
import {UserType} from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    onPageChanged: (currentPage: number) => void;
    followingInProgress: Array<number>;
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
}

const Users: FC<PropsType> = memo(({
                                       users,
                                       totalUsersCount,
                                       onPageChanged,
                                       currentPage,
                                       pageSize,
                                       follow,
                                       followingInProgress,
                                       unfollow
                                   }) => {
    return (
        <div>
            <Paginator pageSize={pageSize} totalUsersCount={totalUsersCount}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>
            <div>
                {
                    users.map(u => <User key={u.id}
                                         user={u}
                                         follow={follow}
                                         followingInProgress={followingInProgress}
                                         unfollow={unfollow}/>
                    )
                }
            </div>
        </div>
    );
});

export default Users;