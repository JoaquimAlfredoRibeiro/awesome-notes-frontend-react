import AuthorizationActionTypes from "./AuthorizationActionTypes";
import isEmpty from '../common/isEmpty'

const INITIAL_STATE = {
    isLoginActive: true,
    isAuthenticated: false,
    user: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE:
            return { ...state, isLoginActive: action.payload }
        case AuthorizationActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}