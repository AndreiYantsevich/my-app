import {combineReducers, createStore} from 'redux';
import reducers from './reducers/reducers';

const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

