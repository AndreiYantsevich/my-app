import React, {Component, FC} from 'react';
import styles from './FormsControls.module.css';
import {Field} from 'redux-form';

type PropsType = {
    input: any
    meta: any
    Formtype: any
}

const FormControl: FC<PropsType> = ({input, meta: {touched, error}, Formtype, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                <Formtype {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>

    )
}

export const Textarea = (props: PropsType) => {
    return <FormControl {...props} Formtype="textarea"/>
}

export const Input = (props: PropsType) => {
    return <FormControl {...props} Formtype="input"/>
}

export const createField = (placeholder: string | null, name: string, component: Function, validators: Array<any>, text?: string, props?: any) => (
    <div>
        <Field placeholder={placeholder} name={name} component={component}
               validate={validators} {...props}/>{text}
    </div>
)