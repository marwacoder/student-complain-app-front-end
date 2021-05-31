import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    isLoading: false,
    error: false
}



export const profile = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AMEND_USER_PROFILE_START:
            return {
                isLoading: true
            }
        case actionTypes.AMEND_USER_PROFILE_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
            }
        case actionTypes.AMEND_USER_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.AMEND_USER_PROFILE_REFRESH:
            return {
               
            }
        default:
            return state;
            }
}

export default profile;