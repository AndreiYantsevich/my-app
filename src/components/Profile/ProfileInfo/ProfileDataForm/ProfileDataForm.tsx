import React, {FC} from 'react';
import styles from './ProfileDataForm.module.css';
import {
    createField,
    GetStringKeys,
    Input,
    Textarea
} from '../../../common/FormControls/FormControls';
import {maxLengthCreator, requiredField} from '../../../../utils/validators/validators';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileType} from '../../../../types/types';
import {PostFormDataType} from '../../MyPosts/PostForm/PostForm';


const maxLength = maxLengthCreator(50)

type ProfileFormValuesTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, OwnPropsType, ErrorType> & OwnPropsType> = ({
                                                                                                         handleSubmit,
                                                                                                         profile,
                                                                                                         error
                                                                                                     }) => {
    return (
        <form onSubmit={handleSubmit}>
            {/*Show error message if exists*/}
            {error && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.data}><strong>Full Name: </strong>
                {createField<ProfileFormValuesTypeKeys>('Full Name', 'fullName', [requiredField, maxLength], Input)}
            </div>

            {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key} className={styles.dataContacts}>
                            <strong>{key}: </strong>
                            {createField('Enter your URL', `contacts.${key}`, [], Input)}
                        </div>
                    )
                }
            )}

            <div className={styles.data}><strong>About me: </strong>
                {createField<ProfileFormValuesTypeKeys>('About me', 'aboutMe', [], Textarea)}
            </div>

            <div className={styles.data}><strong>I'm looking for a job: </strong>
                {createField<ProfileFormValuesTypeKeys>('', 'lookingForAJob', [], Input, {}, '', 'checkbox')}
            </div>

            <div className={styles.data}><strong>Job description: </strong>
                {createField<ProfileFormValuesTypeKeys>('Job description', 'lookingForAJobDescription', [], Textarea)}
            </div>

            <button type="submit" className={styles.button}>Save Changes</button>
        </form>
    )
}

export default reduxForm<ProfileType, OwnPropsType, ErrorType>({
    // a unique name for the form
    form: 'edit-profile'
})(ProfileDataForm)

type OwnPropsType = {
    profile: ProfileType
}

type ErrorType = {
    error: string
}



