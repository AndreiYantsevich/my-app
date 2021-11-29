import React from 'react';
import Header from './Header';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {logout} from '../../store/reducers/auth-reducer';

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void;
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderPropsType> {

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logout})(HeaderContainer);