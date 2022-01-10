import {v1} from 'uuid'
import {profileAPI} from '../api/api';
import {PhotosType, ProfileType, ResultCodeStatus, userProfile} from '../types/types';
import {ThunkType} from './redux-store';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'profile/ADD_POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const SAVE_PHOTO = 'profile/SAVE_PHOTO'

const initialState = {
    posts: [
        {id: v1(), message: 'Hi World! How are you?', likesCounter: 75},
        {id: v1(), message: 'Today is a good day!', likesCounter: 57},
    ],
    profile: userProfile,
    status: ''
}

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: v1(), message: action.newPostBody, likesCounter: 0};
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

//Action
export const addPostAC = (newPostBody: string) => ({type: ADD_POST, newPostBody} as const)

export const setUserProfileAC = (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)

export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)

export const savePhotoAC = (photos: PhotosType) => ({type: SAVE_PHOTO, photos} as const)


//Thunk
export const setUserProfileTC = (userId: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.getUser(userId)
        dispatch(setUserProfileAC(response.data))
    } catch (error) {
        console.log(error)
    }

}

export const getUserStatusTC = (userId: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))
    } catch (error) {
        console.log(error)
    }

}

export const updateStatusTC = (status: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodeStatus.success) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
        console.log(error)
    }
}

export const savePhotoTC = (file: File): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === ResultCodeStatus.success) {
            dispatch(savePhotoAC(response.data.photos))
        }
    } catch (error) {
        console.log(error)
    }
}

export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userId
    if (response.data.resultCode === ResultCodeStatus.success) {
        if (userId) {
            dispatch(setUserProfileTC(userId))
        }
    } else {
        // get error message from server
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
        // stop form submit if fields are wrong
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}

export default profileReducer;


//Types
type InitialStateType = typeof initialState;
export type ProfileActionsType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof setUserProfileAC> |
    ReturnType<typeof setStatusAC> |
    ReturnType<typeof savePhotoAC>





