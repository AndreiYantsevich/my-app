import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
    follow, getUsersThunkCreator,
    setCurrentPage,
    setUsers,
    setUsersTotalCount, toggleFollowingProgress, toggleIsFetching,
    unfollow,
} from '../../store/reducers/users-reducer';
import {RootStateType} from '../../store/store';
import {usersAPI} from '../../api/api';

type UsersContainerPropsType = {
    users: Array<UserType>;
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
    setUsers: (users: Array<UserType>) => void;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    setUsersTotalCount: (totalCount: number) => void;
    isFetching: boolean;
    toggleIsFetching: (isFetching: boolean) => void;
    followingInProgress: Array<number>;
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

export type UsersStateType = {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
};

export type UserType = {
    id: number;
    name: string;
    status?: string;
    photos: {
        small?: string;
        large?: string;
    }
    followed: boolean;
};

class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage);
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress,
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsersThunkCreator
})(UsersContainer);