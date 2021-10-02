import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {ProfileType, setUserProfile} from '../../redux/profile-reducer';

type MapStateToPropsType = {
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType, {}> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

const mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);