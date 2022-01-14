import React from 'react';
import styles from './Users.module.css';
import Pagination from '../common/Pagination/Pagination';
import Preloader from '../common/Preloader/Preloader';
import {UserType} from '../../types/types';
import {User} from './User';

type PropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    followUsers: (userId: string) => void
    unfollowUsers: (userId: string) => void
}

const Users: React.FC<PropsType> = ({
                                        totalUsersCount,
                                        pageSize,
                                        currentPage,
                                        onPageChanged,
                                        isFetching,
                                        users,
                                        followUsers,
                                        unfollowUsers,
                                        followingInProgress
                                    }) => {
    return (
        <div className={styles.users}>
            <h1>Users</h1>
            <Pagination
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {
                isFetching
                    ? <Preloader/>
                    : <>
                        <div className={styles.usersWrapper}>
                            {
                                users.map(u =>
                                    <User
                                        key={u.id}
                                        user={u}
                                        followingInProgress={followingInProgress}
                                        followUsers={followUsers}
                                        unfollowUsers={unfollowUsers}
                                    />
                                )
                            }
                        </div>
                        <Pagination
                            totalUsersCount={totalUsersCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChanged={onPageChanged}
                        />
                    </>
            }
        </div>
    )
}

export default Users;
