import { createStore, combineReducers } from 'redux';
import { userReducer as git } from './Reducers/UsersReducer';

let initialStore = {
    git:{
        users:[],
        repos:[],
    }
}

let store = createStore(combineReducers({git}),initialStore);

export default store;