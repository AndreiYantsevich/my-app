import {combineReducers, createStore} from 'redux';
import dialogsReducer from './reducers/dialogs-reducer';
import profileReducer from './reducers/profile-reducer';
import usersReducer from './reducers/users-reducer';

const reducers = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    users: usersReducer
})

export const store = createStore(reducers)

export type RootStateType = ReturnType<typeof reducers>

