import s from './../Dialogs.module.css'
import {MessageType} from '../../../redux/store';


export function Message(props: MessageType) {
    return (
        <div className={s.message}>{props.message}</div>
    )
}