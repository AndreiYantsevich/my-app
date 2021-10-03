import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {RootState} from '../../store/store';
import {UserType} from '../../store/reducers/users/users-types';
import {UsersActionCreators} from '../../store/reducers/users/users-action-creators';
import {Dispatch} from 'redux';

type UsersPagePropsType = {
    users: Array<UserType>;
    follow: (payload: number) => void;
    unfollow: (payload: number) => void;
    setUsers: (users: Array<UserType>) => void;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    setCurrentPage: (payload: number) => void;
    setUsersTotalCount: (payload: number) => void;
    isFetching: boolean
    toggleIsFetching: (payload: boolean) => void
}

class UsersContainer extends React.Component<UsersPagePropsType, {}> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    onPageChanged = (payload: number) => {
        this.props.setCurrentPage(payload)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${payload}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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
            />
        </>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (payload: number) => {
            dispatch(UsersActionCreators.follow(payload))
        },
        unfollow: (payload: number) => {
            dispatch(UsersActionCreators.unfollow(payload))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(UsersActionCreators.setUsers(users))
        },
        setCurrentPage: (payload: number) => {
            dispatch(UsersActionCreators.setCurrentPage(payload))
        },
        setUsersTotalCount: (payload: number) => {
            dispatch(UsersActionCreators.setUsersTotalCount(payload))
        },
        toggleIsFetching: (payload: boolean) => {
            dispatch(UsersActionCreators.toggleIsFetching(payload))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);