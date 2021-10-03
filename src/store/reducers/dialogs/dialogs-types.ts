import {DialogsActionCreators} from './dialogs-action-creators';

interface DialogsType {
    id: number,
    name: string
}

interface MessageType {
    id: number,
    message: string
}

export interface DialogsStateType {
    newMessageText: string,
    dialogs: Array<DialogsType>,
    messages: Array<MessageType>
}

export enum DialogsActionEnum {
    ADD_MESSAGE = 'ADD_MESSAGE',
    UPDATE_NEW_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT'
}

export type DialogsAction = (
    ReturnType<typeof DialogsActionCreators.addMessage> |
    ReturnType<typeof DialogsActionCreators.updateNewMessageText>
    )