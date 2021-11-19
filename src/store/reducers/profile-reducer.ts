import {PostType} from '../../components/Profile/MyPosts/Post/Post';
import {profileAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';

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
        small: string | null;
        large: string | null;
    }
};

export type ProfileStateType = {
    posts: Array<PostType>;
    newPostText: string;
    profile: null | ProfileType;
};

type ProfileThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ProfileAction>

export enum ProfileEnum {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'CHANGE_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type ProfileAction =
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof setUserProfile>


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ],
    newPostText: '',
    profile: null,
};

export default function profileReducer(state: ProfileStateType = initialState, action: ProfileAction): ProfileStateType {

    switch (action.type) {
        case ProfileEnum.ADD_POST: {
            const newPost = {
                id: state.posts.length + 1,
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

//action creators
export const addPost = () => ({type: ProfileEnum.ADD_POST} as const);
export const updateNewPostText = (newPostText: string) => ({
    type: ProfileEnum.UPDATE_NEW_POST_TEXT,
    newPostText
} as const);
export const setUserProfile = (profile: ProfileType) => ({
    type: ProfileEnum.SET_USER_PROFILE,
    profile
} as const);


//thunk
export const getUserProfile = (userID: string): ProfileThunk => dispatch => {
    profileAPI.getUserProfile(userID).then(data => {
        dispatch(setUserProfile(data));
    })
};
