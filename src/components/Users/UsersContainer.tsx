import React from 'react';
import {connect} from 'react-redux';
import {
    followUsersTC,
    requestUsersTC,
    setCurrentPageAC,
    unfollowUsersTC
} from '../../redux/usersReducer';
import Users from './Users';
import {AppRootStateType} from '../../redux/redux-store';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/user-seletors';
import {UserType} from '../../types/types';


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return (
            <Users
                currentPage={this.props.currentPage}
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                followUsers={this.props.followUsers}
                unfollowUsers={this.props.unfollowUsers}
            />
        )
    }
}


let mapStateToProps = (state: AppRootStateType): MapStateType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(
        mapStateToProps,
        {
            setCurrentPage: setCurrentPageAC,
            getUsers: requestUsersTC,
            followUsers: followUsersTC,
            unfollowUsers: unfollowUsersTC
        }
    )
)(UsersContainer)


// Types
type PropsType = MapStateType & MapDispatchType
type MapStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapDispatchType = {
    setCurrentPage: (currentPage: number) => void
    getUsers: (page: number, pageSize: number) => void
    followUsers: (userId: string) => void
    unfollowUsers: (userId: string) => void
}