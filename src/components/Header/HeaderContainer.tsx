import React from 'react';
import Header from './Header';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/reducers/auth-reducer';

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logoutUser: () => void;
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderPropsType> {

    render() {
        return (
            <Header {...this.props} logoutUser={logoutUser}/>
        );
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logoutUser})(HeaderContainer);