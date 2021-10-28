import React from 'react';
import Header from './Header';
import axios from 'axios';
import {RootStateType} from '../../store/store';
import {connect} from 'react-redux';
import {setAuthUserAvatar, setAuthUserData} from '../../store/reducers/auth-reducer';
import defaultAvatar from '../../assets/images/avatar.png'

export type HeaderContainerPropsType = {
    login: string | null;
    isAuth: boolean;
    avatar: string;
    setAuthUserData: (id: number, email: string, login: string) => void;
    setAuthUserAvatar: (avatar: string) => void;
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login)
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
                        .then(response => {
                            if (response.data.photos.small) {
                                this.props.setAuthUserAvatar(response.data.photos.small)
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