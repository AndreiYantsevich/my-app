import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {logoutTC} from '../../redux/authReducer';


type MSTPType = {
    isAuth: boolean
    login: string | null
}

type MDTPType = {
    logout: () => void
}

export type UserAuthOwnPropsType = MSTPType & MDTPType


class HeaderContainer extends React.Component<UserAuthOwnPropsType> {

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}
                    logout={this.props.logout}/>
        )
    }
}


const MapStateToProps = (state: AppRootStateType): MSTPType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(MapStateToProps, {logout: logoutTC})(HeaderContainer);