import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    error: false,
    message: null,
    isLoading: false,
}






export const examiner = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.POST_EXAMINER_START:
            return {
                isLoading: true
            }
        case actionTypes.POST_EXAMINER_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
                
            }
        case actionTypes.POST_EXAMINER_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.GET_EXAMINER_START:
            return {
                isLoading: true,
                error: false
            }
        case actionTypes.GET_EXAMINER_SUCCESS:
            return {
                isLoading: false,
                error: false,
                data: {...state.data, ...action.payload.examiner}
                
            }
        case actionTypes.GET_EXAMINER_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.POST_EXAMINER_REFRESH:
            return {
                
                
            }
                default:
            return state;
            }
}

export default examiner;
