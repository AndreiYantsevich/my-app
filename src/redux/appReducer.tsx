import {getAuthUserDataTC} from './authReducer';
import {ThunkType} from './redux-store';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}


//Action
export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS} as const)


//Thunk
export const initializeAppTC = (): ThunkType => async dispatch => {
    let promise = dispatch(getAuthUserDataTC())
    await Promise.all([promise])
    dispatch(initializedSuccessAC())
}

export default appReducer;


//Types
export const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
type InitialStateType = typeof initialState;
export type AppActionsType = ReturnType<typeof initializedSuccessAC>;