import React, {FC} from 'react';
import styles from './ProfileDataForm.module.css';
import {Input, Textarea} from '../../../common/FormControls/FormControls';
import {maxLengthCreator, requiredField} from '../../../../utils/validators/validators';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileType} from '../../../../types/types';


const maxLength = maxLengthCreator(50)

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
                <Field
                    component={Input}
                    validate={[requiredField, maxLength]}
                    name={'fullName'}
                    placeholder={'Full Name'}/>
            </div>

            {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key} className={styles.dataContacts}>
                            <strong>{key}: </strong>
                            <Field
                                component={Input}
                                validate={[]}
                                name={`contacts.${key}`}
                                placeholder={'Enter your URL'}/>
                        </div>
                    )
                }
            )}

            <div className={styles.data}><strong>About me: </strong>
                <Field
                    component={Textarea}
                    validate={[]}
                    name={'aboutMe'}
                    placeholder={'About me'}/>
            </div>

            <div className={styles.data}><strong>I'm looking for a job: </strong>
                <Field
                    component={'input'}
                    type="checkbox"
                    validate={[]}
                    name={'lookingForAJob'}
                    placeholder={''}/>
            </div>

            <div className={styles.data}><strong>Job description: </strong>
                <Field
                    component={Textarea}
                    validate={[]}
                    name={'lookingForAJobDescription'}
                    placeholder={'Job description'}/>
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



