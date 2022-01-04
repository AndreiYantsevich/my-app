import {authAPI, securityAPI} from '../api/api';
import {ResultCodeStatus} from '../types/types';
import {ThunkType} from './redux-store';
import {stopSubmit} from 'redux-form';

const initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: ''
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


//Action
export const setAuthUserDataAC = (userId: null | string, email: null | string, login: null | string, isAuth: boolean, captchaUrl: string) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth, captchaUrl}} as const)
export const getCaptchaUrlSuccessAC = (captchaUrl: string) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)


// Thunk
export const getAuthUserDataTC = (): ThunkType => async dispatch => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodeStatus.success) {
        let {id, login, email} = response.data
        dispatch(setAuthUserDataAC(id, email, login, true, initialState.captchaUrl))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, captchaUrl: string): ThunkType => async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captchaUrl)
    if (response.resultCode === ResultCodeStatus.success) {
        dispatch(getAuthUserDataTC())
    } else if (response.resultCode === 10) {
        dispatch(getCaptchaUrlSuccessAC(initialState.captchaUrl))
    }
    // get error message from server
    let message = response.messages.length > 0 ? response.messages[0] : 'Some Error'
    // stop form submit if fields are wrong
    dispatch(stopSubmit('login', {_error: message}))
}
export const logoutTC = (): ThunkType => async dispatch => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodeStatus.success) {
        dispatch(setAuthUserDataAC(null, null, null, false, ''))
    }
}
export const getCaptchaUrlTC = (): ThunkType => async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))
}

export default authReducer;


// Types
export const SET_USER_DATA = 'auth/SET_USER_DATA';
export const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = typeof initialState;
export type AuthActionsType =
    ReturnType<typeof setAuthUserDataAC> |
    ReturnType<typeof getCaptchaUrlSuccessAC>


