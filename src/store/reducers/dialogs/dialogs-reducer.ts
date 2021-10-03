import {DialogsAction, DialogsActionEnum, DialogsStateType} from './dialogs-types';


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


export default function dialogsReducer(state: DialogsStateType = initialState, action: DialogsAction): DialogsStateType {
    switch (action.type) {
        case DialogsActionEnum.ADD_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        case DialogsActionEnum.UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.payload}
        default:
            return state
    }
}