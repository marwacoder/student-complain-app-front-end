import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    error: false,
    message: null,
    isLoading: false,
}






export const lecturer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.POST_LECTURER_START:
            return {
                isLoading: true
            }
        case actionTypes.POST_LECTURER_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
                
            }
        case actionTypes.POST_LECTURER_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.POST_LECTURER_REFRESH:
            return {
                
                
            }
                default:
            return state;
            }
}

export default lecturer;
