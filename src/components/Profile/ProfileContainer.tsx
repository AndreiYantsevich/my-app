import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {
    getUserProfile,
    getUserStatus,
    ProfileType, updateUserStatus
} from '../../store/reducers/profile-reducer';
import {RootStateType} from '../../store/store';
import WithAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number
}

type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void
    getUserStatus: (userID: string) => void
    updateUserStatus: (status: string) => void
}

type ownPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userID = this.props.match.params.userId
        if (!userID) {
            userID = String(this.props.authorizedUserId)
        }
        this.props.getUserProfile(userID);
        this.props.getUserStatus(userID);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profile.profile,
    status: state.profile.status,
    authorizedUserId: state.auth.id
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile: getUserProfile, getUserStatus: getUserStatus, updateUserStatus: updateUserStatus}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);