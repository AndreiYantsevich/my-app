import React from 'react';
import styles from './DialogsForm.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormControls/FormControls';
import {maxLengthCreator, required} from '../../../utils/validators/validators';

export type DialogsFormDataType = {
    newMessageBody: string
}

// validate field max length
const maxLength = maxLengthCreator(50)

const DialogsForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {

    return (
        <form className={styles.form} onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                validate={[required, maxLength]}
                name={'newMessageBody'}
                placeholder="Write your message here"/>
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