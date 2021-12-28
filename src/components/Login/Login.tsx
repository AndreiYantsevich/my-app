import React, {FC, memo} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {RootStateType} from '../../store/store';
import {Redirect} from 'react-router-dom';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/Validators';
import {login} from '../../store/reducers/auth-reducer';
import style from '../common/FormsControls/FormsControls.module.css';

type FormDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

type MapStatePropsType = {
    isAuth: boolean;
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginForm: FC<InjectedFormProps<FormDataType>> = memo(({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [requiredField])}
            {createField('Password', 'password', Input, [requiredField], '', {type: 'password'})}
            {createField(null, 'rememberMe', Input, [], 'remember me', {type: 'checkbox'})}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
});

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login: FC<PropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);