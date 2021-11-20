import {authAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {InferActionsTypes, RootStateType} from '../store';

export enum AuthEnum {
    SET_USER_DATA = 'SET_USER_DATA',
}

const initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
}

export default function authReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case AuthEnum.SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state;
    }
}

//action creators
export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null) => ({
        type: AuthEnum.SET_USER_DATA, payload: {id, email, login}
    } as const)
}

//thunk
export const getAuthUserData = (): AuthThunk => dispatch => {
    authAPI.login()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(actions.setAuthUserData(id, email, login))
            }
        })
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>
