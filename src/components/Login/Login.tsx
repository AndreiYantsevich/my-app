import React from 'react';
import styles from './Login.module.css';
import LoginForm, {LoginFormDataType} from './LoginForm/LoginForm';
import {connect} from 'react-redux';
import {loginTC, logoutTC} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from '../../redux/redux-store';

export type MDTPType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void
    logout: () => void
}

export type MSTPType = {
    isAuth: boolean
    captchaUrl: string
}

const Login = (props: MDTPType & MSTPType) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <section className={styles.section}>
                <LoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
            </section>
        </div>
    )
}


let mapStateToProps = (state: AppRootStateType): MSTPType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

const MapDispatchToProps: MDTPType = {
    login: loginTC,
    logout: logoutTC
}

export default connect(mapStateToProps, MapDispatchToProps)(Login)