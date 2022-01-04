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
import {RouteComponentProps} from 'react-router';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/user-seletors';
import {UsersStructureType} from '../../types/types';


class UsersContainer extends React.Component<OwnPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
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
    connect<MapStateType, MapDispatchType, OwnPropsType, AppRootStateType>(
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
export type UsersPagePropsType = {
    users: Array<UsersStructureType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
    followUsers: (userId: string) => void
    unfollowUsers: (userId: string) => void
}
type PathParamsType = {}
type OwnPropsType = RouteComponentProps<PathParamsType> & UsersPagePropsType
type MapStateType = {
    users: UsersStructureType[]
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