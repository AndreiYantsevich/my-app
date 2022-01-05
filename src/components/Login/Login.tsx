import React from 'react';
import styles from './Login.module.css';
import LoginForm, {LoginFormDataType} from './LoginForm/LoginForm';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from '../../redux/redux-store';

export type MDTPType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type MSTPType = ReturnType<typeof mapStateToProps>

type PropsType = MDTPType & MSTPType

const Login: React.FC<PropsType> = ({login, captchaUrl, isAuth}) => {
    const onSubmit = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <section className={styles.section}>
                <LoginForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
            </section>
        </div>
    )
}


let mapStateToProps = (state: AppRootStateType) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

const MapDispatchToProps: MDTPType = {
    login: loginTC
}

export default connect(mapStateToProps, MapDispatchToProps)(Login)