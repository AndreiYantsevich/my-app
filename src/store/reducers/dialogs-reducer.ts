import {InferActionsTypes} from '../store';

type DialogsType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

export enum DialogsEnum {
    ADD_MESSAGE = 'ADD_MESSAGE',
    UPDATE_NEW_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT'
}

const initialState = {
    newMessageText: '',
    dialogs: [
        {id: 1, name: 'Andrei'},
        {id: 2, name: 'Viktoria'},
        {id: 3, name: 'Arseny'},
        {id: 4, name: 'Visha'},
        {id: 5, name: 'Tomas'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hello!!!'},
        {id: 2, message: 'Mi-mi-mi'},
        {id: 3, message: 'Agu!'},
        {id: 4, message: 'Gav!'},
        {id: 5, message: 'Meow!'}
    ] as Array<MessageType>
}

export default function dialogsReducer(state = initialState, action: ActionsType): InitialStateType {

    switch (action.type) {
        case DialogsEnum.ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        case DialogsEnum.UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageText}
        default:
            return state
    }
}

export const actions = {
    addMessage: () => ({type: DialogsEnum.ADD_MESSAGE} as const),
    updateNewMessageText: (newMessageText: string) => ({
        type: DialogsEnum.UPDATE_NEW_MESSAGE_TEXT,
        newMessageText
    } as const),
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
