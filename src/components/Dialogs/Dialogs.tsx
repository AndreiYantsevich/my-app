import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogPageType} from '../../redux/store';


type dialogsPropsType = {
    dialogsPage: DialogPageType
    changeMessage: (newText: string) => void
    sendMessage: () => void
}

export function Dialogs(props: dialogsPropsType) {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message id={m.id} message={m.message}/>)

    const newMessageTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = event.currentTarget.value
        props.changeMessage(newText)
    }

    const onAddMessageHandler = () => {
        props.sendMessage()
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
                <textarea value={props.dialogsPage.newMessageText} onChange={newMessageTextHandler}/>
            </div>
            <div>
                <button onClick={onAddMessageHandler}>Add message</button>
            </div>
        </div>
    );
}