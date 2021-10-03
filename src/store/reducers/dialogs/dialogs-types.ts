import {DialogsActionCreators} from './dialogs-action-creators';

export enum DialogsActionEnum {
    ADD_MESSAGE = 'ADD_MESSAGE',
    UPDATE_NEW_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT'
}

export type DialogsAction = (
    ReturnType<typeof DialogsActionCreators.addMessage> |
    ReturnType<typeof DialogsActionCreators.updateNewMessageText>
    )