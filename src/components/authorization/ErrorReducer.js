import AuthorizationActionTypes from "./AuthorizationActionTypes";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case AuthorizationActionTypes.GET_ERRORS:
            return action.payload;
        case AuthorizationActionTypes.CLEAR_ERRORS:
            return {}
        default:
            return state;
    }
}