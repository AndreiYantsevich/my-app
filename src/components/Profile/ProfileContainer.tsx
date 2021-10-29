import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ProfileType, setUserProfile} from '../../store/reducers/profile-reducer';
import {RootStateType} from '../../store/store';


interface PathParamsType {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ownPropsType

interface MapStatePropsType {
    profile: ProfileType | null
}

interface MapDispatchPropsType {
    setUserProfile: (payload: ProfileType) => void
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

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    profile: state.profile.profile
})


const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);