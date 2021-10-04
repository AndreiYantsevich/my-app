import {NavLink} from 'react-router-dom';
import s from './../Dialogs.module.css'
import {FC} from 'react';

interface PropsType {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
