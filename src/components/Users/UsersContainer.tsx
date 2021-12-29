import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {follow, requestUsers, unfollow} from '../../store/reducers/users-reducer';
import {
    getUsers, getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize,
    getTotalUsersCount
} from '../../store/selectors/users-selectors'
import {RootStateType} from '../../store/store';
import {compose} from 'redux';
import {UserType} from '../../types/types';

type UsersContainerPropsType = {
    users: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
    requestUsers: (currentPage: number, pageSize: number) => void;
    follow: (userID: number) => void;
    unfollow: (userID: number) => void;
}

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {follow, unfollow, requestUsers})
)(UsersContainer);

