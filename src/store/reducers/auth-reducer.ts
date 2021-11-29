import {authAPI, ResultCodesEnum} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';
import {FormAction, stopSubmit} from 'redux-form';

export enum AuthEnum {
    SET_USER_DATA = 'SET_USER_DATA',
}

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
}

export default function authReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case AuthEnum.SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//action creators
export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: AuthEnum.SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const),
}

//thunk
export const getAuthUserData = (): AuthThunk => dispatch => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
        })
};

export const login = (email: string, password: string, rememberMe: boolean): AuthThunk => dispatch => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthUserData())
            } else if (data.resultCode === ResultCodesEnum.Error) {
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
};

export const logout = (): AuthThunk => dispatch => {
    authAPI.logout()
        .then(() => {
            dispatch(actions.setAuthUserData(null, null, null, false))
        })
};

export type InitialStateType = typeof initialState;
type ActionsType = ReturnType<typeof actions.setAuthUserData>
type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType | FormAction>
