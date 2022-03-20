import React from 'react';
import styles from './PostForm.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../../utils/validators/validators';
import {
    createField,
    GetStringKeys,
    Textarea
} from '../../../common/FormControls/FormControls';


export type PostFormDataType = {
    newPostBody: string
}

type PostsFormValuesTypeKeys = GetStringKeys<PostFormDataType>

// validate field max length
const maxLength = maxLengthCreator(30)

const PostForm: React.FC<InjectedFormProps<PostFormDataType>> = (props) => {

    return (
        <form className={styles.form} onSubmit={props.handleSubmit}>
            {createField<PostsFormValuesTypeKeys>('Write your post here', 'newPostBody', [requiredField, maxLength], Textarea)}
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