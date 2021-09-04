import {combineReducers, createStore} from 'redux';
import {profileReducer} from './ProfileReducer';
import {dialogsReducer} from './DialogsReducer';

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

export const store = createStore(reducers)