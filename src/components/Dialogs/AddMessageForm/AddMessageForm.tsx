import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React, {FC, memo} from 'react';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, requiredField} from '../../../utils/validators/Validators';

export type FormDataType = {
    newMessageText: string
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: FC<InjectedFormProps<FormDataType>> = memo((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageText'}
                       validate={[requiredField, maxLength50]}
                       placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
});
export const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)