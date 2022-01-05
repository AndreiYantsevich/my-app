import React from 'react';
import styles from './FormControls.module.css';
import {Field, WrappedFieldProps} from 'redux-form';
import {RequiredFieldType} from '../../../utils/validators/validators';

type OwnPropsType = {
    text: string
}

export const Textarea = (props: WrappedFieldProps) => {
    const {input, meta: {touched, error}, ...restProps} = props;
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <textarea {...input} className={styles.textarea} {...restProps}/>
            <span className={styles.errorMsg}>{hasError && error}</span>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps & OwnPropsType> = (props) => {
    const {input, meta: {touched, error}, text, ...restProps} = props;
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <input {...input} className={styles.inputText} {...restProps}/>
            <span className={styles.errorMsg}>{hasError && error}</span>
        </div>
    )
}

export const createField = (name: string, validators: RequiredFieldType[], component: React.FC<WrappedFieldProps & OwnPropsType>, props: any = {}, text?: string) =>
    <>
        <Field
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </>


