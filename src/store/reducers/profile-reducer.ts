import {profileAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {InferActionsTypes, RootStateType} from '../store';
import {PhotosType, PostType, ProfileType} from '../../types/types';

export enum ProfileEnum {
    ADD_POST = 'profile/ADD_POST',
    SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
    SET_USER_STATUS = 'profile/SET_USER_STATUS',
    SET_USER_PHOTO = 'profile/SET_USER_PHOTO',
    DELETE_POST = 'profile/DELETE_POST',
}

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
};

export default function profileReducer(state = initialState, action: ActionsType): InitialStateType {

    switch (action.type) {
        case ProfileEnum.ADD_POST: {
            const newPost = {
                id: state.posts.length + 1,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case ProfileEnum.SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case ProfileEnum.SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        case ProfileEnum.SET_USER_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        case ProfileEnum.DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }

        }
        default: {
            return state
        }
    }
};

//action creators
export const actions = {
    addPost: (newPostText: string) => ({
        type: ProfileEnum.ADD_POST,
        newPostText
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: ProfileEnum.SET_USER_PROFILE,
        profile
    } as const),
    setUserStatus: (status: string) => ({
        type: ProfileEnum.SET_USER_STATUS,
        status
    } as const),
    setUserPhoto: (photos: PhotosType) => ({
        type: ProfileEnum.SET_USER_PHOTO,
        photos
    } as const),
    deletePost: (postId: number) => ({type: ProfileEnum.DELETE_POST, postId} as const),
}

//thunk
export const getUserProfile = (userID: number): ProfileThunk => async dispatch => {
    let response = await profileAPI.getUserProfile(userID)
    dispatch(actions.setUserProfile(response.data));
};
export const getUserStatus = (userID: number): ProfileThunk => async dispatch => {
    let response = await profileAPI.getUserStatus(userID)
    dispatch(actions.setUserStatus(response.data));
};
export const updateUserStatus = (status: string): ProfileThunk => async dispatch => {
    let response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserStatus(status));
    }
};
export const updateUserPhoto = (photo: File): ProfileThunk => async dispatch => {
    let response = await profileAPI.updateUserPhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserPhoto(response.data.data.photos))
    }
}

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
type ProfileThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>