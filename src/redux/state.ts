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
    posts: Array<PostsType>
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export let state: RootStateType = {
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Andrei'},
            {id: 2, name: 'Viktoria'},
            {id: 3, name: 'Arseny'},
            {id: 4, name: 'Visha'},
            {id: 5, name: 'Tomas'}
        ],
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Agu!'},
            {id: 4, message: 'Gav!'},
            {id: 5, message: 'Meow!'}
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 25},
            {id: 2, message: 'This is my first project', likesCount: 49}
        ]
    }
}

export let addPost = (postMessage: string) => {
    let newPost = {
        id: 3,
        message: postMessage,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
}