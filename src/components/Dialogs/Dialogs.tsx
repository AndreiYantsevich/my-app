import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css'

type DialogsPropsType = {
    name: string
    id: string
}

type MessagePropsType = {
    message: string
}

function DialogItem(props: DialogsPropsType) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

function Message(props: MessagePropsType) {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export function Dialogs() {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                <DialogItem name={'Dimych'} id={'1'}/>
                <DialogItem name={'Andrei'} id={'2'}/>
                <DialogItem name={'Sveta'} id={'3'}/>
                <DialogItem name={'Sasha'} id={'4'}/>
                <DialogItem name={'Viktor'} id={'5'}/>
                <DialogItem name={'Valera'} id={'6'}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'How are you?'}/>
                <Message message={'Yo!!!'}/>
            </div>
        </div>
    );
}