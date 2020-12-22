import {ADD_USERS, RESET_USERS} from '../ActionConstants/UsersConstants';

export function addUsers(info){
    return{
        type: ADD_USERS,
        payload: info
    }
}

export function resetUsers(){
    return{
        type: RESET_USERS,
    }
}