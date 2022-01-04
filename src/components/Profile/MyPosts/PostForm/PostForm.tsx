import React from 'react';
import styles from './PostForm.module.css';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../../utils/validators/validators';
import {Textarea} from '../../../common/FormControls/FormControls';


export type PostFormDataType = {
    newPostBody: string
}

// validate field max length
const maxLength = maxLengthCreator(30)

const PostForm: React.FC<InjectedFormProps<PostFormDataType>> = (props) => {

    return (
        <form className={styles.form} onSubmit={props.handleSubmit}>
            <Field
                // Textarea => custom component
                component={Textarea}
                validate={[required, maxLength]}
                name={'newPostBody'}
                placeholder="Write your post here"
            />
            <button
                className={styles.button}>Add post
            </button>
        </form>
    )
}

export default reduxForm<PostFormDataType>({
    // a unique name for the form
    form: 'postForm'
})(PostForm)