import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';
import {FormAction} from 'redux-form';
import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}
export default function appReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const);

export const initializeApp = (): AppThunk => dispatch => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

type InitialStateType = typeof initialState;
type ActionsType = ReturnType<typeof initializedSuccess>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType | FormAction>;