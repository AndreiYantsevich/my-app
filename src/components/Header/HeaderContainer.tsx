import React from 'react';
import Header from './Header';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {setAuthUserAvatar, setAuthUserData} from '../../store/reducers/auth-reducer';
import defaultAvatar from '../../assets/images/avatar.png'
import {authAPI, profileAPI} from '../../api/api';

type HeaderContainerPropsType = {
    login: string | null;
    isAuth: boolean;
    avatar: string;
    setAuthUserData: (id: number, email: string, login: string) => void;
    setAuthUserAvatar: (avatar: string) => void;
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {

            authAPI.login()
                .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login)
                    profileAPI.getUserAvatar(id)
                        .then(data => {
                            if (data.photos.small) {
                                this.props.setAuthUserAvatar(data.photos.small)
                            } else {
                                this.props.setAuthUserAvatar(defaultAvatar)
                            }
                        });
                }
            })
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
    login: string
    avatar: string
}

const mapStateToProps = (state: RootStateType): mapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.userAvatar,
});

export default connect(mapStateToProps, {setAuthUserData, setAuthUserAvatar})(HeaderContainer);