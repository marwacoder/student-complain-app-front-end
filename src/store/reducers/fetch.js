import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: [],
    error: false,
    message: null,
    isLoading: false,
}






export const fetch = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.GET_USER_COMPLAINT_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_USER_COMPLAINT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: { ...state.data, ...action.payload.data },
                
            }
        case actionTypes.GET_USER_COMPLAINT_FAIL:
            return {
                data: {...state.data},
                isLoading: false,
                error: true
            }
        case actionTypes.GET_USER_COMPLAINT_REFRESH:
            return {
                data: {...state.data},
                isLoading: false,
            }
        case actionTypes.GET_COMMENT_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_COMMENT_SUCCESS:
            return {
                isLoading: false,
                message: action.payload.msg,
                data: action.payload
                
            }
        case actionTypes.GET_COMMENT_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.GET_HISTORY_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_HISTORY_SUCCESS:
            return {
               isLoading: false,
                message: action.payload.msg,
                data: action.payload.inbox
                
            }
        case actionTypes.GET_HISTORY_FAIL:
            return {
                 isLoading: false,
                error: true,
                message: action.payload.msg
            }
        default:
            return state;
            }
}

export default fetch;
