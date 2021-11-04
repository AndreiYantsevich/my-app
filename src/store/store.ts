import {applyMiddleware, combineReducers, createStore} from 'redux';
import dialogsReducer from './reducers/dialogs-reducer';
import profileReducer from './reducers/profile-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof reducers>

