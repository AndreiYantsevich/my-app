import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {followAC, setUsersAC, unfollowAC, UserType} from '../../redux/users-reducer';
import {StateType} from '../../redux/redux-store';

const mapStateToProps = (state: StateType) => {
    return {
        usersState: state.usersPage.users
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

    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)