
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'CHANGE-POST-TEXT';

export type ActionsProfileType = AddPostType | ChangePostTextType

type AddPostType = {
    type: typeof ADD_POST
}

type ChangePostTextType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newPostText: string
}

const initialState = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ]
}

export type ProfilePageType = typeof initialState

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsProfileType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST: {
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
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newPostText
            }
        }
        default: {
            return state
        }
    }

}

export const addPostAC = (): AddPostType => {
    return {
        type: ADD_POST
    } as const
}

export const changePostAC = (newText: string): ChangePostTextType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newPostText: newText
    } as const
}


