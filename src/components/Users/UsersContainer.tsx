import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    UserType
} from '../../redux/users-reducer';
import {StateType} from '../../redux/redux-store';

const mapStateToProps = (state: StateType) => {
    return {
        usersState: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        followUser: (userID: number) => {
            dispatch(followAC(userID))
        },
        unfollowUser: (userID: number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }

    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)