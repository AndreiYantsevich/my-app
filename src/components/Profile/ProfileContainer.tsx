import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {
    getUserProfile,
    getUserStatus,
    updateUserPhoto, updateUserStatus
} from '../../store/reducers/profile-reducer';
import {RootStateType} from '../../store/store';
import WithAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userID: number | null) => void
    getUserStatus: (userID: number | null) => void
    updateUserStatus: (status: string) => void
    updateUserPhoto: (photo: File) => void
}
type PathParamsType = {
    userId: string
}

type ownPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userID: number | null = +this.props.match.params.userId
        if (!userID) {
            userID = this.props.authorizedUserId
            if (!userID) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userID);
        this.props.getUserStatus(userID);
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     updateUserPhoto={this.props.updateUserPhoto}
            />
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profile.profile,
    status: state.profile.status,
    authorizedUserId: state.auth.id
})

export default compose<ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        updateUserPhoto
    }),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);