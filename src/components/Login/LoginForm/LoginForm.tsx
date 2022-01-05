import React from 'react';
import styles from './LoginForm.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../../common/FormControls/FormControls';
import {requiredField} from '../../../utils/validators/validators';

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type OwnPropsType = {
    captchaUrl: string | null
}

type ErrorType = {
    error: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, OwnPropsType, ErrorType> & OwnPropsType> = ({
                                                                                                               handleSubmit,
                                                                                                               captchaUrl,
                                                                                                               error
                                                                                                           }) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            {error && <p className={styles.errorMsg}>{error}</p>}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('captcha', [requiredField], Input)}

            <div className={styles.formRow}>
                <label htmlFor="login_login">Login</label>
                {createField('email', [requiredField], Input)}
            </div>
            <div className={styles.formRow}>
                <label htmlFor="login_psw">Password</label>
                {createField('password', [requiredField], Input, {type: 'password'})}
            </div>
            <div className={styles.formRow}>
                {createField('rememberMe', [], Input, {
                    type: 'checkbox',
                    className: styles.inputCheckbox
                }, 'Remember me')}
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