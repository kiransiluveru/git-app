import { ADD_USERS, RESET_USERS } from "../ActionConstants/UsersConstants";

export function userReducer(currentState = {}, action) {
    switch (action.type) {
        case ADD_USERS:
            let users = [...currentState.users]
            users.push(...action.payload);
            console.log('users here reduver', users);
            return Object.assign({}, currentState, { users: users });
        case RESET_USERS:
            return Object.assign({}, currentState, { users: [] });
        default: {
            return currentState;
        }
    }
}