import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {getUserProfile, ProfileType} from '../../store/reducers/profile-reducer';
import {RootStateType} from '../../store/store';
import WithAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

type MapStatePropsType = {
    profile: ProfileType | null
    authorizedUserId: number
}

type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void
}

type ownPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userID = this.props.match.params.userId
        if (!userID) {
            userID = String(this.props.authorizedUserId)
        }
        this.props.getUserProfile(userID);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profile.profile,
    authorizedUserId: state.auth.id
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile: getUserProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);