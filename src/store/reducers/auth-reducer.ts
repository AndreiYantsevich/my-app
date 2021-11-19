import {authAPI, profileAPI} from '../../api/api';
import defaultAvatar from '../../assets/images/avatar.png';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';

export enum AuthEnum {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_USER_AVATAR = 'SET_USER_AVATAR'
}

type AuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    userAvatar: string
}

type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AuthAction>

export type AuthAction =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setAuthUserAvatar>

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    userAvatar: 'default',
}

export default function authReducer(state: AuthStateType = initialState, action: AuthAction): AuthStateType {
    switch (action.type) {
        case AuthEnum.SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case AuthEnum.SET_USER_AVATAR:
            return {
                ...state,
                userAvatar: action.avatar
            }
        default:
            return state;
    }
}

//action creators
export const setAuthUserData = (id: number, email: string, login: string) => ({
    type: AuthEnum.SET_USER_DATA, payload: {id, email, login}
} as const);
export const setAuthUserAvatar = (avatar: string) => ({
    type: AuthEnum.SET_USER_AVATAR,
    avatar
} as const);


//thunk
export const getAuthUserData = (): AuthThunk => dispatch => {
    authAPI.login()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login))
                profileAPI.getUserAvatar(id)
                    .then(data => {
                        if (data.photos.small) {
                            dispatch(setAuthUserAvatar(data.photos.small));
                        } else {
                            dispatch(setAuthUserAvatar(defaultAvatar));
                        }
                    });
            }
        })
};
