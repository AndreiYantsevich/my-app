import {DialogsActionEnum} from './dialogs-types';


export const DialogsActionCreators = {
    addMessage: () => ({type: DialogsActionEnum.ADD_MESSAGE} as const),
    updateNewMessageText: (payload: string) => ({type: DialogsActionEnum.UPDATE_NEW_MESSAGE_TEXT, payload} as const),
}