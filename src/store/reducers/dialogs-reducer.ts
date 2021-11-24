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
    ADD_MESSAGE = 'ADD_MESSAGE'
}

const initialState = {
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
                id: state.messages.length + 1,
                message: action.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state
    }
}

export const actions = {
    addMessage: (newMessageText: string) => ({
        type: DialogsEnum.ADD_MESSAGE,
        newMessageText
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
