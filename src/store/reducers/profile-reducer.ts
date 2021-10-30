import {PostType} from '../../components/Profile/MyPosts/Post/Post';

export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    },
    lookingForAJob: boolean;
    lookingForAJobDescription: string
    fullName: string;
    userId: number;
    photos: {
        small: string;
        large: string;
    }
};

export type ProfileStateType = {
    posts: Array<PostType>;
    newPostText: string;
    profile: null | ProfileType;
};

export enum ProfileEnum {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'CHANGE_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type ProfileAction =
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof setUserProfile>


const initialState: ProfileStateType = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ],
    profile: null as ProfileType | null,
};

export default function profileReducer(state= initialState, action: ProfileAction): ProfileStateType {

    switch (action.type) {
        case ProfileEnum.ADD_POST: {
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
        case ProfileEnum.UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newPostText
            }
        }
        case ProfileEnum.SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }
};

export const addPost = () => ({type: ProfileEnum.ADD_POST} as const);
export const updateNewPostText = (newPostText: string) => ({
    type: ProfileEnum.UPDATE_NEW_POST_TEXT,
    newPostText
} as const);
export const setUserProfile = (profile: ProfileType) => ({type: ProfileEnum.SET_USER_PROFILE, profile} as const);
