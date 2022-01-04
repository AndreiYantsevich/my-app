import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem, {DialogItemType} from './DialogItem/DialogItem';
import Message, {MessageType} from './Message/Message';
import DialogsForm, {DialogsFormDataType} from './DialogsForm/DialogsForm';

export type DialogsType = {
    dialogs: Array<DialogItemType>
    updateNewMessage: (text: string) => void
    sendMessage: (newMessageBody: string) => void
}

export type MessagesType = {
    messages: Array<MessageType>
    newMessageText: string
}

const Dialogs = (props: DialogsType & MessagesType) => {

    let dialogsElements = props.dialogs
        .map(dialog => <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>)

    let messagesElements = props.messages
        .map(message => <Message key={message.id} message={message.message}
                                 id={message.id}/>)

    const onSubmit = (formData: DialogsFormDataType) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={styles.dialogs}>
            <h1>Dialogs</h1>
            <div className={styles.content}>

                <div className={styles.colLeft}>
                    {dialogsElements}
                </div>

                <div className={styles.colRight}>
                    {messagesElements}

                    <DialogsForm onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;