const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'CHANGE-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export type ProfileType = {
    aboutMe: string | null;
    contacts: {
        facebook: string | null;
        website: string | null;
        vk: string | null;
        twitter: string | null;
        instagram: string | null;
        youtube: string | null;
        github: string | null;
        mainLink: string | null;
    },
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    fullName: string;
    userId: number;
    photos: {
        small: string | undefined;
        large: string | undefined;
    }
}

export type ActionsProfileType = AddPostTypeAC | ChangePostTextTypeAC | SetUserProfileTypeAC

type AddPostTypeAC = {
    type: typeof ADD_POST
}

type ChangePostTextTypeAC = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newPostText: string
}

type SetUserProfileTypeAC = {
    type: typeof SET_USER_PROFILE,
    profile: any
}

const initialState = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ],
    profile: null
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
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }

}

export const addPostAC = (): AddPostTypeAC => ({type: ADD_POST} as const)
export const changePostAC = (newText: string): ChangePostTextTypeAC => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newPostText: newText
    } as const
}
export const setUserProfile = (profile: any): SetUserProfileTypeAC => ({type: SET_USER_PROFILE, profile} as const)


