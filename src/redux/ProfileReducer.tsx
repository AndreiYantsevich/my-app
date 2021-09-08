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
        case 'ADD-POST': {
            const newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
        }
        case 'CHANGE-POST-TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        default: {
            return state
        }
    }

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


