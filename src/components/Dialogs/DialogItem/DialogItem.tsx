import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';


export type DialogItemType = {
    id: string
    name: string
}

const DialogItem = (props: DialogItemType) => {
    return (
        <div className={styles.dialogItem}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;