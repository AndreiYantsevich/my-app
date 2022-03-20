import React from 'react';
import styles from './FormControls.module.css';
import {Field, WrappedFieldProps} from 'redux-form';
import {RequiredFieldType} from '../../../utils/validators/validators';

type OwnPropsType = {
    text: string
}

export const Textarea: React.FC<WrappedFieldProps> = ({
                                                          input,
                                                          meta: {touched, error},
                                                          ...restProps
                                                      }) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <textarea {...input} className={styles.textarea} {...restProps}/>
            <span className={styles.errorMsg}>{hasError && error}</span>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps & OwnPropsType> = ({
                                                                      input,
                                                                      meta: {
                                                                          touched,
                                                                          error
                                                                      },
                                                                      text,
                                                                      ...restProps
                                                                  }) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <input {...input} className={styles.inputText} {...restProps}/>
            <span className={styles.errorMsg}>{hasError && error}</span>
        </div>
    )
}


export function createField<FormKeysType extends string>(placeholder: string, name: FormKeysType, validators: RequiredFieldType[], component: React.FC<WrappedFieldProps & OwnPropsType>, props = {}, text?: string) {
    return <>
        <Field
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </>;
}


