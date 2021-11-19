import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { DialogsStateType } from '../../store/reducers/dialogs-reducer';

type PropsType = {
    dialogs: DialogsStateType
    updateNewMessageText: (newMessageText: string) => void
    addMessage: () => void
}

const Dialogs: React.FC<PropsType> = React.memo((props) => {

    const dialogsElements = props.dialogs.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    const messagesElements = props.dialogs.messages.map(m => <Message id={m.id} key={m.id} message={m.message}/>)

    const onNewMessageTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageText = event.currentTarget.value
        props.updateNewMessageText(newMessageText)
    }

    const onAddMessageHandler = () => {
        props.addMessage();
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
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
});

export default Dialogs;