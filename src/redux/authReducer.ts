import {FormAction, stopSubmit} from 'redux-form';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {securityAPI} from '../api/securityAPI';
import {authAPI} from '../api/authAPI';
import {ResultCodeStatus} from '../api/api';

const initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
            return {...state, ...action.data}
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {...state, ...action.payload}
        default:
            return state
    }
}


//Actions
export const actions = {
    setAuthUserData: (userId: null | string, email: null | string, login: null | string, isAuth: boolean) =>
        ({type: 'auth/SET_USER_DATA', data: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),
}

// Thunks
export const getAuthUserData = (): ThunkType => async dispatch => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === ResultCodeStatus.success) {
            const {id, login, email} = response.data
            dispatch(actions.setAuthUserData(id, email, login, true))
        }
    } catch (error) {
        console.log(error)
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodeStatus.success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeStatus.captchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        // get error message from server
        const message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
        // stop form submit if fields are wrong
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrl = (): ThunkType => async dispatch => {
    try {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.url
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {
        console.log(error)
    }

}
export const logout = (): ThunkType => async dispatch => {
    try {
        const response = await authAPI.logout()
        if (response.resultCode === ResultCodeStatus.success) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    } catch (error) {
        console.log(error)
    }

}

export default authReducer;


// Types
type InitialStateType = typeof initialState;
type AuthActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<AuthActionsType | FormAction>;


