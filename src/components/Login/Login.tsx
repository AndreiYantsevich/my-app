import React, {FC, memo} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginUser} from '../../store/reducers/auth-reducer';
import {RootStateType} from '../../store/store';
import {Redirect} from 'react-router-dom';
import {Input} from '../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/Validators';

type FormDataType = {
    login: string;
    password: string;
    rememberMe: boolean;
}

type MapStatePropsType = {
    isAuth: boolean;
}

type MapDispatchPropsType = {
    loginUser: (email: string, password: string, rememberMe: boolean) => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const LoginForm: FC<InjectedFormProps<FormDataType>> = memo((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={Input}/>
                remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
});

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login: FC<PropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginUser(formData.login, formData.password, formData.rememberMe)
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

export default connect(mapStateToProps, {loginUser})(Login);