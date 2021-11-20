import React from 'react';
import Header from './Header';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {getAuthUserData} from '../../store/reducers/auth-reducer';

type HeaderContainerPropsType = {
    login: string | null;
    isAuth: boolean;
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
            />
        );
    }
}

type mapStateType = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: RootStateType): mapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);