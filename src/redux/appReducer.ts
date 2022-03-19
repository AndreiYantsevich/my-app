import {BaseThunkType, InferActionsTypes} from './redux-store';
import {getAuthUserData} from './authReducer';


const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}


//Actions
export const actions = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}

//Thunks
export const initializeApp = (): ThunkType => async dispatch => {
    try {
        const promise = dispatch(getAuthUserData())
        await Promise.all([promise])
        dispatch(actions.initializedSuccess())
    } catch (error) {
        console.log(error)
    }

}

export default appReducer;


//Types
type InitialStateType = typeof initialState;
type AppActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<AppActionsType>;