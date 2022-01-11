import {authAPI, securityAPI} from '../api/api';
import {ResultCodeStatus} from '../types/types';
import {stopSubmit} from 'redux-form';
import {ThunkType} from './redux-store';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}


//Actions
export const setAuthUserDataAC = (userId: null | string, email: null | string, login: null | string, isAuth: boolean) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth}} as const)
export const getCaptchaUrlSuccessAC = (captchaUrl: string) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)


// Thunks
export const getAuthUserDataTC = (): ThunkType => async dispatch => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === ResultCodeStatus.success) {
            const {id, login, email} = response.data
            dispatch(setAuthUserDataAC(id, email, login, true))
        }
    } catch (error) {
        console.log(error)
    }

}
export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodeStatus.success) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
        // get error message from server
        const message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
        // stop form submit if fields are wrong
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrlTC = (): ThunkType => async dispatch => {
    try {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccessAC(captchaUrl))
    } catch (error) {
        console.log(error)
    }

}
export const logoutTC = (): ThunkType => async dispatch => {
    try {
        const response = await authAPI.logout()
        if (response.resultCode === ResultCodeStatus.success) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        }
    } catch (error) {
        console.log(error)
    }

}

export default authReducer;


// Types
export type InitialStateType = typeof initialState;
export type AuthActionsType =
    ReturnType<typeof setAuthUserDataAC> |
    ReturnType<typeof getCaptchaUrlSuccessAC>


