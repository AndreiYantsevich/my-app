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

export let state: RootStateType = {
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
}

export const addPost = () => {
    const newPost = {
        id: 3,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const changePostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export const addMessage = () => {
    const newMessage = {
        id: 6,
        message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
}

export const changeMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText
    rerenderEntireTree(state)
}

