import React from 'react';
import styles from './Message.module.css';

export type MessageType = {
    id: string
    message: string
}

const Message = (props: MessageType) => {
    return (
        <div key={props.id} className={styles.message}>{props.message}</div>
    )
}

export default Message;