import {v1} from 'uuid'
import {PhotosType, ProfileType} from '../types/types';
import {FormAction, stopSubmit} from 'redux-form';
import {profileAPI} from '../api/profileAPI';
import {ResultCodeStatus} from '../api/api';
import {BaseThunkType, InferActionsTypes} from './redux-store';


const initialState = {
    posts: [
        {id: v1(), message: 'Hi World! How are you?', likesCounter: 75},
        {id: v1(), message: 'Today is a good day!', likesCounter: 57},
    ],
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD_POST':
            let newPost = {id: v1(), message: action.newPostBody, likesCounter: 0};
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }
        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profile/SAVE_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}


//Actions
export const actions = {
    addPost: (newPostBody: string) =>
        ({type: 'profile/ADD_POST', newPostBody} as const),
    setUserProfile: (profile: ProfileType) =>
        ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) =>
        ({type: 'profile/SET_STATUS', status} as const),
    setPhoto: (photos: PhotosType) =>
        ({type: 'profile/SAVE_PHOTO', photos} as const),
}


//Thunks
export const getUserProfile = (userId: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.getUser(userId)
        dispatch(actions.setUserProfile(response))
    } catch (error) {
        console.log(error)
    }

}
export const getUserStatus = (userId: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response))
    } catch (error) {
        console.log(error)
    }

}
export const updateStatus = (status: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.resultCode === ResultCodeStatus.success) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        console.log(error)
    }
}
export const savePhoto = (file: File): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.savePhoto(file)
        if (response.resultCode === ResultCodeStatus.success) {
            dispatch(actions.setPhoto(response.data.photos))
        }
    } catch (error) {
        console.log(error)
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userId
    if (response.resultCode === ResultCodeStatus.success) {
        if (userId) {
            dispatch(getUserProfile(userId))
        }
    } else {
        // get error message from server
        const message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
        // stop form submit if fields are wrong
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}

export default profileReducer;


//Types
type InitialStateType = typeof initialState;
type ProfileActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ProfileActionsType | FormAction>;





