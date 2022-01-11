import {ThunkType} from './redux-store';
import {getAuthUserDataTC} from './authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

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


//Actions
export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS} as const)


//Thunks
export const initializeAppTC = (): ThunkType => async dispatch => {
    try {
        const promise = dispatch(getAuthUserDataTC())
        await Promise.all([promise])
        dispatch(initializedSuccessAC())
    } catch (error) {
        console.log(error)
    }

}

export default appReducer;


//Types
type InitialStateType = typeof initialState;
export type AppActionsType = ReturnType<typeof initializedSuccessAC>;