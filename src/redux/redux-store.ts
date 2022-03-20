import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import appReducer from './appReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>;
export default store;

// @ts-ignore
window.store = store;