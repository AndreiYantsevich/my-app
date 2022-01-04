import {v1} from 'uuid';

const initialState = {
    dialogs: [
        {id: v1(), name: 'Jack'},
        {id: v1(), name: 'Nick'},
        {id: v1(), name: 'Alex'},
    ],
    messages: [
        {id: v1(), message: 'Hi! How are you?'},
        {id: v1(), message: 'I am fine! And you?'},
        {id: v1(), message: 'Me too. Have a nice day!'},
        {id: v1(), message: ':)'},
    ]
}

const dialogsReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: action.newMessageBody}]
            }
        default:
            return state
    }
}

//Action
export const addMessageAC = (newMessageBody: string) => ({
    type: ADD_MESSAGE,
    newMessageBody
} as const)

export default dialogsReducer;


//Types
export const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

type InitialStateType = typeof initialState;
export type DialogsActionsType = ReturnType<typeof addMessageAC>;