import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    error: false,
    message: null,
    isLoading: false,
}






export const mail = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.STUDENT_TO_EXAMINER_START:
            return {
                isLoading: true
            }
        case actionTypes.STUDENT_TO_EXAMINER_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
                
            }
        case actionTypes.STUDENT_TO_EXAMINER_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.STUDENT_TO_EXAMINER_REFRESH:
            return {
            }
        case actionTypes.STUDENT_TO_LECTURER_START:
            return {
                isLoading: true
            }
        case actionTypes.STUDENT_TO_LECTURER_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
                
            }
        case actionTypes.STUDENT_TO_LECTURER_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.STUDENT_TO_LECTURER_REFRESH:
            return {
            }
        case actionTypes.EXAMINER_TO_STUDENT_START:
            return {
                isLoading: true
            }
        case actionTypes.EXAMINER_TO_STUDENT_SUCCESS:
            return {
                isLoading: false,
                error: false,
                message: action.payload.msg
                
            }
        case actionTypes.EXAMINER_TO_STUDENT_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.EXAMINER_TO_STUDENT_REFRESH:
            return {
            }
        case actionTypes.GET_STUDENT_MAILS_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_STUDENT_MAILS_SUCCESS:
            return {
                isLoading: false,
                message: action.payload.msg,
                data: action.payload.inbox
                
            }
        case actionTypes.GET_STUDENT_MAILS_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        
                default:
            return state;
            }
}

export default mail;
