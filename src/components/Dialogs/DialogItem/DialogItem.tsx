import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'

type DialogItemType = {
    id: number
    name: string
}

export function DialogItem(props: DialogItemType) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}
