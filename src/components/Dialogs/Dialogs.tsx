import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogType, MessageType} from '../../redux/state';


type dialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
    addMessage: (postMessage: string) => void
    changeMessageText: (newText: string) => void
}

export function Dialogs(props: dialogsPropsType) {

    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.messages.map(m => <Message id={m.id} message={m.message}/>)

    const newMessageTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeMessageText(event.currentTarget.value)
    }

    const addMessage = () => {
        props.addMessage(props.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea value={props.newMessageText} onChange={newMessageTextHandler}/>
            </div>
            <div>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    );
}