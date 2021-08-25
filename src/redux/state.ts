import {rerenderEntireTree} from '../render';

export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    newPostText: string
    posts: Array<PostsType>
}

export type DialogPageType = {
    newMessageText: string
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof changePostAC> |
    ReturnType<typeof changeMessageAC>


export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const addMessageAC = () => {
    return {
        type: 'ADD-MESSAGE'
    } as const
}

export const changePostAC = (newText: string) => {
    return {
        type: 'CHANGE-POST-TEXT',
        newText: newText
    } as const
}

export const changeMessageAC = (newText: string) => {
    return {
        type: 'CHANGE-MESSAGE-TEXT',
        newText: newText
    } as const
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
    dispatch(action) {

        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            rerenderEntireTree(store)
        } else if (action.type === 'ADD-MESSAGE') {
            const newMessage = {
                id: 6,
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            rerenderEntireTree(store)
        } else if (action.type === 'CHANGE-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            rerenderEntireTree(store)
        } else if (action.type === 'CHANGE-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newText
            rerenderEntireTree(store)
        }
    }
}

