import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';


type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

type MapStatePropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

type ownPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType, {}> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '19514'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);