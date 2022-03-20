import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {logout} from '../../redux/authReducer';


class HeaderContainer extends React.Component<UserAuthOwnPropsType> {

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}
                    logout={this.props.logout}/>
        )
    }
}

const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(MapStateToProps, {logout: logout})(HeaderContainer);


//Types
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    logout: () => void
}

export type UserAuthOwnPropsType = MapStateToPropsType & MapDispatchToPropsType