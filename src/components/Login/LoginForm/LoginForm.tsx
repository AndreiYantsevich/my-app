import React from 'react';
import styles from './LoginForm.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input, InputPsw} from '../../common/FormControls/FormControls';
import {maxLengthCreator, required} from '../../../utils/validators/validators';

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string
}

type OwnPropsType = {
    captchaUrl: string
}

type ErrorType = {
    error: string
}

// validate field max length
const maxLength = maxLengthCreator(30)

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, OwnPropsType, ErrorType> & OwnPropsType> = ({
                                                                                                               handleSubmit,
                                                                                                               captchaUrl,
                                                                                                               error
                                                                                                           }) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/*Show error message if exists*/}
            {error && <p className={styles.errorMsg}>{error}</p>}

            {/*CAPTCHA*/}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field
                component={Input}
                validate={[required]}
                name={'captchaUrl'}
                placeholder={'Symbols from image'}/>}


            <div className={styles.formRow}>
                <label htmlFor="login_login">Login</label>
                <Field
                    component={Input}
                    validate={[required, maxLength]}
                    name={'email'}
                    placeholder={'email'}/>
            </div>
            <div className={styles.formRow}>
                <label htmlFor="login_psw">Password</label>
                <Field
                    component={InputPsw}
                    validate={[required, maxLength]}
                    name={'password'}
                    placeholder={'Password'}/>
            </div>
            <div className={styles.formRow}>
                <Field
                    component={'input'}
                    name={'rememberMe'}
                    type="checkbox"
                    className={styles.inputCheckbox}/>
                <label htmlFor="login_rememberMe">Remember me</label>
            </div>
            <div className={styles.formRow}>
                <button
                    type={'submit'}
                    className={styles.button}>Send
                </button>
            </div>
        </form>
    )
}


export default reduxForm<LoginFormDataType, OwnPropsType, ErrorType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)