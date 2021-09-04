import {ActionTypes} from './store';

const initialState = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ]
}

export const profileReducer = (state = initialState, action: ActionTypes) => {

    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            break;
        case 'CHANGE-POST-TEXT':
            state.newPostText = action.newText
            break;
    }
    return state
}

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const changePostAC = (newText: string) => {
    return {
        type: 'CHANGE-POST-TEXT',
        newText: newText
    } as const
}
