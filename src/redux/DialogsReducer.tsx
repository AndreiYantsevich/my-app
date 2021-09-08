import {ActionTypes} from './store';

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

export const dialogsReducer = (state = initialState, action: ActionTypes) => {

    switch (action.type) {
        case 'ADD-MESSAGE':
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, newMessage]
            }
        case 'CHANGE-MESSAGE-TEXT':
            return {
                ...state,
                newMessageText: action.newText
            }
        default:
            return state
    }
}

export const addMessageAC = () => {
    return {
        type: 'ADD-MESSAGE'
    } as const
}

export const changeMessageAC = (newText: string) => {
    return {
        type: 'CHANGE-MESSAGE-TEXT',
        newText: newText
    } as const
}