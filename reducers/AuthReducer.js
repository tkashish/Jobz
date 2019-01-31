import { FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
    token: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case FACEBOOK_LOGIN_FAIL:
            return initialState;
        case FACEBOOK_LOGOUT_SUCCESS:
            return initialState;
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload };

        default:
            return state
    }
};
