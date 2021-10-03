/*
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'CHANGE-MESSAGE-TEXT'

export type ActionsDialogsType = AddMessageTypeAC | ChangeMessageTextTypeAC

type AddMessageTypeAC = {
    type: typeof ADD_MESSAGE
}

type ChangeMessageTextTypeAC = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessageText: string
}

const initialState = {
    newMessageText: '',
    dialogs: [
        {id: 1, name: 'Andrei'},
        {id: 2, name: 'Viktoria'},
        {id: 3, name: 'Arseny'},
        {id: 4, name: 'Visha'},
        {id: 5, name: 'Tomas'}
    ],
    messages: [
        {id: 1, message: 'Hello!!!'},
        {id: 2, message: 'Mi-mi-mi'},
        {id: 3, message: 'Agu!'},
        {id: 4, message: 'Gav!'},
        {id: 5, message: 'Meow!'}
    ]
}

export type DialogsPageType = typeof initialState

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsDialogsType): DialogsPageType => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessageText
            }
        default:
            return state
    }
}

export const addMessageAC = (): AddMessageTypeAC => {
    return {
        type: ADD_MESSAGE
    } as const
}

export const changeMessageAC = (newText: string): ChangeMessageTextTypeAC => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessageText: newText
    } as const
}
*/
