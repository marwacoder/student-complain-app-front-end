import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    token: null,
    message: null,
    isLoading: false,
    isLoggedIn: false,
    isLoggedOut: false
}


export const isAuthenticated = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                isLoading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                isLoading: false,
                isLoggedIn:true,
                data: { ...state.data, ...action.payload.user },
                token: action.payload.token
            }
        case actionTypes.AUTH_FAIL:
            return {

                isLoading: false,
                isLoggedIn: false,
                error: true,
                message: action.payload
            }
        case actionTypes.AUTH_REFRESH:
            return {
                isLoading: false,
                isLoggedIn: false,
                isLoggedOut: false
            }
        case actionTypes.LOG_OUT:
            return {
                isLoggedOut: true,
                isLoggedIn: false,
                data: {...state.data}
            }
        default:
            return state;
            }
}

export default isAuthenticated;


