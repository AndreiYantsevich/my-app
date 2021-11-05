import React from 'react';
import Header from './Header';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {getAuthUserData} from '../../store/reducers/auth-reducer';

type HeaderContainerPropsType = {
    login: string | null;
    isAuth: boolean;
    avatar: string;
    getAuthUserData: () => void;
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <Header login={this.props.login}
                    isAuth={this.props.isAuth}
                    avatar={this.props.avatar}
            />
        );
    }
}

type mapStateType = {
    isAuth: boolean
    login: string | null
    avatar: string
}

const mapStateToProps = (state: RootStateType): mapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.userAvatar,
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);