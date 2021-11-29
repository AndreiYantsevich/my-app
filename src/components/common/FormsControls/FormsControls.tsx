import React, {FC} from 'react';
import styles from './FormsControls.module.css';

type PropsType = {
    input: any
    meta: any
    Formtype: any
}

const FormControl: FC<PropsType> = ({input, meta, Formtype, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                <Formtype {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
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