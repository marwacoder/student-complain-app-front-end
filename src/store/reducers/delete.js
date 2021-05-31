import * as actionTypes from '../actions/actionTypes'


const initState = {
    error: false,
    message: null,
    isLoading: false
}






export const destroy = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.DELETE_COMMENT_START:
            return {
                isLoading: true
            }
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg,
            }
        case actionTypes.DELETE_COMMENT_REFRESH:
            return {
                isLoading: false,
                
            }
        case actionTypes.DELETE_COMMENT_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg,
            }
        case actionTypes.DELETE_EMAIL_START:
            return {
                isLoading: true
            }
        case actionTypes.DELETE_EMAIL_SUCCESS: 
            return {
                isLoading: false,
                error: false,
                message : action.payload.msg
            }
        case actionTypes.DELETE_EMAIL_FAIL:
            return {
                isLoading: false,
                error: false,
                message : action.payload.msg
            }
        case actionTypes.DELETE_EMAIL_REFRESH:
            return {
                isLoading: false,
            }
        
        
       
        default:
            return state;
            }
}

export default destroy;
