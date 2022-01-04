import React from 'react';
import styles from './FormControls.module.css';


export const Textarea: React.FC = (props: any) => {
    const hasError = props.meta.touched && props.meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <textarea {...props.input} className={styles.textarea}/>
            {hasError && <span className={styles.errorMsg}>{props.meta.error}</span>}
        </div>
    )
}

export const Input: React.FC = (props: any) => {
    const hasError = props.meta.touched && props.meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <input {...props.input} className={styles.inputText}/>
            {hasError && <span className={styles.errorMsg}>{props.meta.error}</span>}
        </div>
    )
}

export const InputPsw: React.FC = (props: any) => {
    const hasError = props.meta.touched && props.meta.error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <input {...props.input} className={styles.inputText} type={'password'}/>
            {hasError && <span className={styles.errorMsg}>{props.meta.error}</span>}
        </div>
    )
}

