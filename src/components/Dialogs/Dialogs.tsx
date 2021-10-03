import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogsStateType} from '../../store/reducers/dialogs/dialogs-types';

type PropsType = {
    dialogs: DialogsStateType
    updateNewMessageText: (payload: string) => void
    addMessage: () => void
}

export function Dialogs(props: PropsType) {

    const dialogsElements = props.dialogs.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    const messagesElements = props.dialogs.messages.map(m => <Message id={m.id} key={m.id} message={m.message}/>)

    const onNewMessageTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let payload = event.currentTarget.value
        props.updateNewMessageText(payload)
    }

    const onAddMessageHandler = () => {
        props.addMessage()
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
                <textarea value={props.dialogs.newMessageText} onChange={onNewMessageTextHandler}/>
            </div>
            <div>
                <button onClick={onAddMessageHandler}>Add message</button>
            </div>
        </div>
    );
}