import s from './../Dialogs.module.css'
import {FC} from 'react';

interface PropsType {
    message: string
    id: number
}

const Message: FC<PropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message;