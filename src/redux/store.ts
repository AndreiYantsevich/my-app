import {ActionsProfileType, ProfilePageType, profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';


export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: () => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: ActionsProfileType) => void
}

export const store: StoreType = {
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            newPostText: '',
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 25},
                {id: 2, message: 'This is my first project', likesCount: 49}
            ]
        }
    },

    getState() {
        return this._state
    },

    _callSubscriber() {
        console.log('App rendering')
    },

    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}
