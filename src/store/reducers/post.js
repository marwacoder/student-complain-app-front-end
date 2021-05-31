import * as actionTypes from '../actions/actionTypes'


const initState = {
    error: false,
    message: null,
    isLoading: false,
}






export const post = (state = initState, action) => {

    switch (action.type) {
        
        case actionTypes.COMPLAIN_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.COMPLAIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
            }
        case actionTypes.COMPLAIN_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
                
            }
        case actionTypes.COMPLAIN_REFRESH:
            return {
                isLoading: false,
            }
        case actionTypes.CREATE_ACCOUNT_START:
            return {
                isLoading: true
            }
        case actionTypes.CREATE_ACCOUNT_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.message,
            }
        case actionTypes.CREATE_ACCOUNT_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
            }
        case actionTypes.CREATE_ACCOUNT_REFRESH:
            return {
                isLoading: false,
            }
        
        case actionTypes.SEND_COMMENT_START:
            return {
                isLoading: true
            }
        case actionTypes.SEND_COMMENT_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.message,
            }
        case actionTypes.SEND_COMMENT_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload,
            }
        case actionTypes.SEND_COMMENT_REFRESH:
            return {
                isLoading: false,
                
            }
        
        default:
            return state;
            }
}

export default post;
