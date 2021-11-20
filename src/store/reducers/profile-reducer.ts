import {profileAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {InferActionsTypes, RootStateType} from '../store';
import {PhotosType, PostType, ProfileType} from '../../types/types';

export enum ProfileEnum {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'CHANGE_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    SET_USER_STATUS = 'SET_USER_STATUS',
    SET_USER_PHOTO = 'SET_USER_PHOTO'
}

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: '',
};

export default function profileReducer(state = initialState, action: ActionsType): InitialStateType {

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
        case ProfileEnum.SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        case ProfileEnum.SET_USER_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default: {
            return state
        }
    }
};

//action creators
export const actions = {
    addPost: () => ({type: ProfileEnum.ADD_POST} as const),
    updateNewPostText: (newPostText: string) => ({
        type: ProfileEnum.UPDATE_NEW_POST_TEXT,
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
}

//thunk
export const getUserProfile = (userID: string): ProfileThunk => dispatch => {
    profileAPI.getUserProfile(userID).then(data => {
        dispatch(actions.setUserProfile(data));
    })
};
export const getUserStatus = (userID: string): ProfileThunk => dispatch => {
    profileAPI.getUserStatus(userID).then(data => {
        dispatch(actions.setUserStatus(data));
    })
};
export const updateUserStatus = (status: string): ProfileThunk => dispatch => {
    profileAPI.updateUserStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    })
};
export const updateUserPhoto = (photo: File): ProfileThunk => dispatch => {
    profileAPI.updateUserPhoto(photo).then(data => {
        if (data.resultCode === 0) {
            dispatch(actions.setUserPhoto(data.data.photos))
        }
    })
}

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
type ProfileThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>
