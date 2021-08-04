import s from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogPageType} from '../../redux/state';
import React from 'react';

export function Dialogs(props: DialogPageType) {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message id={m.id} message={m.message}/>)

    let newMessageElement: any = React.createRef<HTMLTextAreaElement>()

    let addMessage = () => {
        let text = newMessageElement.current.value
        alert(text)
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
            <textarea ref={newMessageElement}></textarea>
            </div>
            <div>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    );
}