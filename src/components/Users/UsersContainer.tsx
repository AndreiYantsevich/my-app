import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {Dispatch} from 'redux';
import {UsersActionCreators, UserType} from '../../store/reducers/users-reducer';
import {RootStateType} from '../../store/store';

interface UsersPagePropsType {
    users: Array<UserType>;
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
    setUsers: (users: Array<UserType>) => void;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    setUsersTotalCount: (totalCount: number) => void;
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
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

    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
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

const mapStateToProps = (state: RootStateType) => {
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
        follow: (userID: number) => {
            dispatch(UsersActionCreators.follow(userID))
        },
        unfollow: (userID: number) => {
            dispatch(UsersActionCreators.unfollow(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(UsersActionCreators.setUsers(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(UsersActionCreators.setCurrentPage(currentPage))
        },
        setUsersTotalCount: (totalCount: number) => {
            dispatch(UsersActionCreators.setUsersTotalCount(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(UsersActionCreators.toggleIsFetching(isFetching))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);