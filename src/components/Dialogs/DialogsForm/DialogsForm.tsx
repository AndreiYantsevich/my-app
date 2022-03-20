import React from 'react';
import styles from './DialogsForm.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {
    createField,
    GetStringKeys,
    Textarea
} from '../../common/FormControls/FormControls';
import {maxLengthCreator, requiredField} from '../../../utils/validators/validators';

export type DialogsFormDataType = {
    newMessageBody: string
}

type DialogsFormValuesTypeKeys = GetStringKeys<DialogsFormDataType>


// validate field max length
const maxLength = maxLengthCreator(50)

const DialogsForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {

    return (
        <form className={styles.form} onSubmit={props.handleSubmit}>
            {createField<DialogsFormValuesTypeKeys>('Write your message here', 'newMessageBody', [requiredField, maxLength], Textarea)}
            <button
                type={'submit'}
                className={styles.button}>Add message
            </button>
        </form>
    )
}

export default reduxForm<DialogsFormDataType>({
    // a unique name for the form
    form: 'messageForm'
})(DialogsForm)