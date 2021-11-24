import React, {FC, memo} from 'react';
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {InitialStateType} from '../../store/reducers/dialogs-reducer';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';

type PropsType = {
    dialogs: InitialStateType
    addMessage: (newMessageText: string) => void
}

type FormDataType = {
    newMessageText: string
}

const Dialogs: FC<PropsType> = memo((props) => {

    const dialogsElements = props.dialogs.dialogs.map(d => <DialogItem name={d.name}
                                                                       key={d.id}
                                                                       id={d.id}/>)
    const messagesElements = props.dialogs.messages.map(m => <Message id={m.id} key={m.id}
                                                                      message={m.message}/>)

    const addNewMessage = (formData: FormDataType) => {
        props.addMessage(formData.newMessageText);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
});

const AddMessageForm: FC<InjectedFormProps<FormDataType>> = memo((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageText'}
                       placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    );
});

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;