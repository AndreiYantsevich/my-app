import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profileReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ProfileType} from '../../types/types';

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.setUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            profile={this.props.profile}
            status={this.props.status}
            updateUserStatus={this.props.updateUserStatus}
            saveProfile={this.props.saveProfile}
        />
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(
        mapStateToProps,
        {
            setUserProfile: getUserProfile,
            getUserStatus: getUserStatus,
            updateUserStatus: updateStatus,
            savePhoto: savePhoto,
            saveProfile: saveProfile
        }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


// Types
type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    setUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export type PropsType =
    MapDispatchToPropsType
    & MapStateToPropsType
    & RouteComponentProps<{ userId: string }>

