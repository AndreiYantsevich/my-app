import {v1} from 'uuid';
import {InferActionsTypes} from './redux-store';


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
        case 'dialogs/ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: action.newMessageBody}]
            }
        default:
            return state
    }
}

//Action
export const actions = {
    addMessage: (newMessageBody: string) =>
        ({type: 'dialogs/ADD_MESSAGE', newMessageBody} as const)
}


export default dialogsReducer;


//Types
type InitialStateType = typeof initialState;
type DialogsActionsType = InferActionsTypes<typeof actions>;