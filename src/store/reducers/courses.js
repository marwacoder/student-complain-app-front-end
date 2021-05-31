import * as actionTypes from '../actions/actionTypes'


const initState = {
    data: {},
    error: false,
    message: null,
    isLoading: false,
}






export const course = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.GET_COURSES_START:
            return {
                isLoading: true
            }
        case actionTypes.GET_COURSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload.course 
                
            }
        case actionTypes.GET_COURSES_FAIL:
            return {
                data: {...state.data},
                isLoading: false,
                error: true
            }
        case actionTypes.ADD_COURSES_START:
            return {
                isLoading: true
            }
        case actionTypes.ADD_COURSES_SUCCESS:
            return {
                ...state,
                error: false,
                isLoading: false,
                data: action.payload.msg 
                
            }
        case actionTypes.ADD_COURSES_FAIL:
            return {
                isLoading: false,
                error: true,
                message: action.payload.msg
            }
        case actionTypes.ADD_COURSES_REFRESH:
            return {
                
            }
                default:
            return state;
            }
}

export default course;
