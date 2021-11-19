import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {getUserProfile, ProfileType} from '../../store/reducers/profile-reducer';
import {RootStateType} from '../../store/store';
import WithAuthRedirect from '../../hoc/withAuthRedirect';


type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

type MapStatePropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void
}

type ownPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType, {}> {

    componentDidMount() {
        let userID = this.props.match.params.userId
        if (!userID) {
            userID = '2'
        }
        this.props.getUserProfile(userID);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    profile: state.profile.profile,
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default WithAuthRedirect(connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent));