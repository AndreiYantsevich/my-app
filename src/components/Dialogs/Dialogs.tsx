import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {ActionTypes, addMessageAC, changeMessageAC, DialogType, MessageType} from '../../redux/state';


type dialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
    dispatch: (action: ActionTypes) => void
}

export function Dialogs(props: dialogsPropsType) {

    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.messages.map(m => <Message id={m.id} message={m.message}/>)
    const newMessageText = props.newMessageText

    const newMessageTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      let newText = event.currentTarget.value
        props.dispatch(changeMessageAC(newText))
    }

    const onAddMessageClick = () => {
        props.dispatch(addMessageAC())
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
                <textarea value={newMessageText} onChange={newMessageTextHandler}/>
            </div>
            <div>
                <button onClick={onAddMessageClick}>Add message</button>
            </div>
        </div>
    );
}