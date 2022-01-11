import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {ProfileActionsType} from './profileReducer';
import dialogsReducer, {DialogsActionsType} from './dialogsReducer';
import appReducer, {AppActionsType} from './appReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import authReducer, {AuthActionsType} from './authReducer';
import usersReducer, {UsersActionsType} from './usersReducer';

const reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof reducers>;
export type AppRootActionsType =
    AppActionsType |
    AuthActionsType |
    DialogsActionsType |
    ProfileActionsType |
    UsersActionsType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>;
export default store;

// dev debugger store
// @ts-ignore
window.store = store;