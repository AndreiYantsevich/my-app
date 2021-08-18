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
    changeMessageText: (newText: string) => void
    addMessage: () => void
    changePostText: (newText: string) => void
    addPost: () => void
    getState: () => RootStateType
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
    changeMessageText(newText: string) {
        this._state.dialogsPage.newMessageText = newText
        rerenderEntireTree(store)
    },
    addMessage() {
        const newMessage = {
            id: 6,
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage)
        this._state.dialogsPage.newMessageText = ''
        rerenderEntireTree(store)
    },
    changePostText(newText: string) {
        this._state.profilePage.newPostText = newText
        rerenderEntireTree(store)
    },
    addPost() {
        const newPost = {
            id: 3,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        rerenderEntireTree(store)
    },
    getState() {
        return this._state
    }
}

