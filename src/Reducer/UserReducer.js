import { combineReducers } from 'redux'

var INITIAL_STATE = {
    currentUser: {},
    posible: [
        'Allie',
        'Gator',
        'Lizzie',
        'Reptar',
    ]
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_CURRENT_USER':
            var {currentUser, posible} = state
            currentUser = action.payload

            const newState = {currentUser, posible}
            return newState
        default:
            return state
    }
}

export default combineReducers({
    users: UserReducer
})