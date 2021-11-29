import React, {FC} from 'react';
import styles from './FormsControls.module.css';

type PropsType = {
    input: any
    meta: any
    element: Element
}

const FormControl: FC<PropsType> = ({input, meta, children, element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                <element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: FC<PropsType> = (props) => {
    return <FormControl {...props} element={textarea}/>
}

export const Input: FC<PropsType> = (props) => {
    return <FormControl {...props} element={input}/>
}