import axios from 'axios'
import { createBrowserHistory } from 'history';
import setAuthToken from '../../API'
import * as actionTypes from './actionTypes';
import * as api from '../../helpers/API'

import {API} from '../constant'

const { ERROR_MESSAGE} = API
export const history = createBrowserHistory()


//AUTHENTICATION ACTION
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    }
}

export const authFail = (payload) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload
    };
};

export const authRefresh = () => {
    return {
        type: actionTypes.AUTH_REFRESH,
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOG_OUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(userLogout());   
        },expirationTime * 1000)
    }
}
//LOGIN
export const auth = (username, password) => {
 
    return (dispatch) => {
        dispatch(authStart());
        api.login({username, password}).then(resp => {
            setTimeout(() => {
                dispatch(authSuccess(resp.data))
                dispatch(checkAuthTimeOut(resp.data.expiresIn))
                const token = resp.data.token;
                sessionStorage.setItem('user-token', token);
                setAuthToken(token)
            },2000)
        }).catch(err => {
           
                dispatch(authFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE)) 
      })
    };
};

export const isSessionActive = () => {
  let token;
  try {
    token = sessionStorage.getItem("user-token");
  } catch (error) {
    return false;
  }
  return Boolean(token);
};

export const clearSession = () => {
  try {
    sessionStorage.removeItem("user-token");
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = () => (dispatch) => {
    dispatch(logout()); 
     clearSession();
};

//SEND COMPLAIN ACTION
export const complainStart = () => {
    return {
        type: actionTypes.COMPLAIN_START
    }
}

export const complainSuccess = (payload) => {
    return {
        type: actionTypes.COMPLAIN_SUCCESS,
        payload
    }
}

export const complainFail = (payload) => {
    return {
        type: actionTypes.COMPLAIN_FAIL,
        payload
    };
};

export const complainRefresh = () => {
    return {
        type: actionTypes.COMPLAIN_REFRESH,
    };
};



//GET USER ACTION
export const getUserProfileStart = () => {
    return {
        type: actionTypes.GET_USER_PROFILE_START
    }
}

export const getUserProfileSuccess = (payload) => {
    return {
        type: actionTypes.GET_USER_PROFILE_SUCCESS,
        payload
    }
}

export const getUserProfileFail = (payload) => {
    return {
        type: actionTypes.GET_USER_PROFILE_FAIL,
        payload
    };
};

export const getUserProfileRefresh = () => {
    return {
        type: actionTypes.GET_USER_PROFILE_REFRESH,
    };
};




export const getUserProfile = ({ role, studentId }) => {
        return (dispatch) => {
        dispatch(getUserProfileStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/student/'+ studentId).then(resp => {
            dispatch(getUserProfileSuccess(resp.data))
        }).catch(err => {
            dispatch(getUserProfileFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
   };
    
   
};

export const amendUserProfileStart = () => {
    return {
        type: actionTypes.AMEND_USER_PROFILE_START
    }
}

export const amendUserProfileSuccess = (payload) => {
    return {
        type: actionTypes.AMEND_USER_PROFILE_SUCCESS,
        payload
    }
}

export const amendUserProfileFail = (payload) => {
    return {
        type: actionTypes.AMEND_USER_PROFILE_FAIL,
        payload
    };
};

export const amendUserProfileRefresh = () => {
    return {
        type: actionTypes.AMEND_USER_PROFILE_REFRESH,
    };
};




export const amendUserProfile = ({id, phoneNumber, email, password}) => {
        return (dispatch) => {
        dispatch(amendUserProfileStart());
            axios.post('http://localhost:8000/dcs.abu.edu.ng/user/amend/' + id, {
            phoneNumber, email, password
        }).then(resp => {
            dispatch(amendUserProfileSuccess(resp.data))
        }).catch(err => {
            dispatch(amendUserProfileFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
   }; 
};

//CREATE ACCOUNT ACTION
export const createAccountStart = () => {
    return {
        type: actionTypes.CREATE_ACCOUNT_START
    }
}

export const createAccountSuccess = (payload) => {
    return {
        type: actionTypes.CREATE_ACCOUNT_SUCCESS,
        payload
    }
}

export const createAccountFail = (payload) => {
    return {
        type: actionTypes.CREATE_ACCOUNT_FAIL,
        payload
    };
};

export const createAccountRefresh = () => {
    return {
        type: actionTypes.CREATE_ACCOUNT_REFRESH,
    };
};

export const register = (user_id, name, gender, level, email, phone, password, role) => {
    return (dispatch) => {
        dispatch(createAccountStart());
        axios.post( 'http://localhost:8000/dcs.abu.edu.ng/user/register',
        {user_id, name, gender, level, email, phone, password, role}).then(resp => {
            setTimeout(() => {
                dispatch(createAccountSuccess(resp.data.meta))
            },3000)
        }).catch(err => {
        dispatch(createAccountFail(err.response !== undefined ? err.response.data.meta.message: ERROR_MESSAGE.NETWORK_FAILURE))  
    console.log(err.response,'acc')
      })
    };
};


//GET USER COMPLAINT HISTORY ACTION
export const getHistoryStart = () => {
    return {
        type: actionTypes.GET_HISTORY_START
    }
}

export const getHistorySuccess = (payload) => {
    return {
        type: actionTypes.GET_HISTORY_SUCCESS,
        payload
    }
}

export const getHistoryFail = (payload) => {
    return {
        type: actionTypes.GET_HISTORY_FAIL,
        payload
    };
};

export const getHistory = (role, lecturerId) => {
    if (role === 'Examiner') {
        return (dispatch) => {
        dispatch(getHistoryStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/mail/examinerInbox').then(resp => {
            dispatch(getHistorySuccess(resp.data))
        }).catch(err => {
            dispatch(getHistoryFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    };
    } else {
       return (dispatch) => {
        dispatch(getHistoryStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/mail/lecturerInbox/'+ lecturerId).then(resp => {
            dispatch(getHistorySuccess(resp.data))
        }).catch(err => {
            dispatch(getHistoryFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    }; 
    }
};


//GET USER COMPLAINT COMMENT ACTION
export const getCommentStart = () => {
    return {
        type: actionTypes.GET_COMMENT_START
    }
}

export const getCommentSuccess = (payload) => {
    return {
        type: actionTypes.GET_COMMENT_SUCCESS,
        payload
    }
}

export const getCommentFail = (payload) => {
    return {
        type: actionTypes.GET_COMMENT_FAIL,
        payload
    };
};


//let two = 'http://localhost:8000/dcs.abu.edu.ng/mail/show2/'+id



export const getComment = ({id, role}) => {
    if (role === 'Admin') {
        return (dispatch) => {
        dispatch(getCommentStart());
         axios.all([axios.get(`http://localhost:8000/dcs.abu.edu.ng/mail/show3/`), axios.get(`http://localhost:8000/dcs.abu.edu.ng/mail/show4/`)]).then(axios.spread((...response) => {
             let res1 = response[0].data.mails;
             let res2 = response[1].data.mails;
            const combined = [].concat(res1, res2)
           dispatch(getCommentSuccess(combined))
       })).catch(err => {
            dispatch(getCommentFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
        })
    };
    } else{
        return (dispatch) => {
        dispatch(getCommentStart());
         axios.all([axios.get(`http://localhost:8000/dcs.abu.edu.ng/mail/show1/`+ id), axios.get(`http://localhost:8000/dcs.abu.edu.ng/mail/show2/`+ id)]).then(axios.spread((...response) => {
             let res1 = response[0].data.mails;
             let res2 = response[1].data.mails;
            const combined = [].concat(res1, res2)
           dispatch(getCommentSuccess(combined))
       })).catch(err => {
            dispatch(getCommentFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
        })
    };
    }
     
};


//DELETE COMMENT ACTION
export const deleteCommentStart = () => {
    return {
        type: actionTypes.DELETE_COMMENT_START
    }
}

export const deleteCommentSuccess = (payload) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        payload
    }
}

export const deleteCommentFail = (payload) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
        payload
    };
};

export const deleteCommentRefresh = () => {
    return {
        type: actionTypes.DELETE_COMMENT_REFRESH,
    };
};

export const deleteComment = ({studentId, emailId}) => {
    return (dispatch) => {
        dispatch(deleteCommentStart());
        axios.post( 'http://localhost:8000/dcs.abu.edu.ng/mail/destroy/'+ emailId).then(resp => {
            setTimeout(() => {
                dispatch(deleteCommentSuccess(resp.data))
                if (resp.data)
                    return dispatch(getComment(studentId))
            })
        }).catch(err => {
            console.log(err.response, )
            dispatch(deleteCommentFail(err.response !== undefined ? err.response.data.error: ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};


//DELETE Email ACTION
export const deleteEmailStart = () => {
    return {
        type: actionTypes.DELETE_EMAIL_START
    }
}

export const deleteEmailSuccess = (payload) => {
    return {
        type: actionTypes.DELETE_EMAIL_SUCCESS,
         payload
    }
}

export const deleteEmailFail = (payload) => {
    return {
        type: actionTypes.DELETE_EMAIL_FAIL,
        payload
    };
};

export const deleteEmailRefresh = () => {
    return {
        type: actionTypes.DELETE_EMAIL_REFRESH,
    };
};

export const deleteEmail = ({role, lecturerId, emailId}) => {
    return (dispatch) => {
        dispatch(deleteCommentStart());
        axios.post( 'http://localhost:8000/dcs.abu.edu.ng/mail/destroy1/'+ emailId).then(resp => {
            setTimeout(() => {
                dispatch(deleteCommentSuccess(resp.data))
                if (resp.data)
                    return dispatch(getHistory(role, lecturerId))
            })
        }).catch(err => {
            console.log(err.response, )
            dispatch(deleteCommentFail(err.response !== undefined ? err.response.data.error: ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};



//DELETE Email ACTION
export const postExaminerStart = () => {
    return {
        type: actionTypes.POST_EXAMINER_START
    }
}

export const postExaminerSuccess = (payload) => {
    return {
        type: actionTypes.POST_EXAMINER_SUCCESS,
         payload
    }
}

export const postExaminerFail = (payload) => {
    return {
        type: actionTypes.POST_EXAMINER_FAIL,
        payload
    };
};

export const postExaminerRefresh = () => {
    return {
        type: actionTypes.POST_EXAMINER_REFRESH,
    };
};

export const postExaminer = ({examinerId, name, gender, email,phoneNumber, password, role}) => {
    return (dispatch) => {
        dispatch(postExaminerStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/examiner/create', {
            examinerId, name, gender, email,phoneNumber, password, role
        }).then(resp => {
            
            dispatch(postExaminerSuccess(resp.data))
            
        
        }).catch(err => {
            dispatch(postExaminerFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};



export const getExaminerStart = () => {
    return {
        type: actionTypes.GET_EXAMINER_START
    }
}

export const getExaminerSuccess = (payload) => {
    return {
        type: actionTypes.GET_EXAMINER_SUCCESS,
         payload
    }
}

export const getExaminerFail = (payload) => {
    return {
        type: actionTypes.GET_EXAMINER_FAIL,
        payload
    };
};

export const getExaminerRefresh = () => {
    return {
        type: actionTypes.GET_EXAMINER_REFRESH,
    };
};

export const getExaminer = () => {
    return (dispatch) => {
        dispatch(getExaminerStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/examiner/examiners/getAll').then(resp => {
            
            dispatch(getExaminerSuccess(resp.data))
            
        
        }).catch(err => {
            dispatch(getExaminerFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};


export const postStudentStart = () => {
    return {
        type: actionTypes.POST_STUDENT_START
    }
}

export const postStudentSuccess = (payload) => {
    return {
        type: actionTypes.POST_STUDENT_SUCCESS,
         payload
    }
}

export const postStudentFail = (payload) => {
    return {
        type: actionTypes.POST_STUDENT_FAIL,
        payload
    };
};

export const postStudentRefresh = () => {
    return {
        type: actionTypes.POST_STUDENT_REFRESH,
    };
};

export const postStudent = ({studentId, name, gender, email,phoneNumber, level, password, role}) => {
    return (dispatch) => {
        dispatch(postStudentStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/student/create', {
            studentId, name, gender, email,phoneNumber,level, password, role
        }).then(resp => {
            
            dispatch(postStudentSuccess(resp.data))
            
        
        }).catch(err => {
            dispatch(postStudentFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};



export const postLecturerStart = () => {
    return {
        type: actionTypes.POST_LECTURER_START
    }
}

export const postLecturerSuccess = (payload) => {
    return {
        type: actionTypes.POST_LECTURER_SUCCESS,
         payload
    }
}

export const postLecturerFail = (payload) => {
    return {
        type: actionTypes.POST_LECTURER_FAIL,
        payload
    };
};

export const postLecturerRefresh = () => {
    return {
        type: actionTypes.POST_LECTURER_REFRESH,
    };
};

export const postLecturer = ({lecturerId, name, gender, email,phoneNumber, password, role, courseId}) => {
    return (dispatch) => {
        dispatch(postLecturerStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/lecturer/create', {
            lecturerId, name, gender, email,phoneNumber, password, role, courseId
        }).then(resp => {
            
            dispatch(postLecturerSuccess(resp.data))
            
        
        }).catch(err => {
            dispatch(postLecturerFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
};


export const studentToExaminerStart = () => {
    return {
        type: actionTypes.STUDENT_TO_EXAMINER_START
    }
}

export const studentToExaminerSuccess = (payload) => {
    return {
        type: actionTypes.STUDENT_TO_EXAMINER_SUCCESS,
         payload
    }
}

export const studentToExaminerFail = (payload) => {
    return {
        type: actionTypes.STUDENT_TO_EXAMINER_FAIL,
        payload
    };
};

export const studentToExaminerRefresh = () => {
    return {
        type: actionTypes.STUDENT_TO_EXAMINER_REFRESH,
    };
};

export const studentToExaminerOrLecturer = ({ complainType, message, from, to, studentId, courseId, lecturerId }) => {
    if (complainType === 'Exam Result') {
    return (dispatch) => {  
        dispatch(studentToExaminerStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/mail/studentToExaminer', {
            complainType, message, from, to, studentId, courseId
        }).then(resp => {
            
            dispatch(studentToExaminerSuccess(resp.data))
            dispatch(getExaminer())
            
        
        }).catch(err => {
            dispatch(studentToExaminerFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };    
    } else {
        return (dispatch) => {  
        dispatch(studentToLecturerStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/mail/studentToLecturer', {
            complainType, message, from, to, studentId, courseId, lecturerId
        }).then(resp => {
            
            dispatch(studentToLecturerSuccess(resp.data))
            dispatch(getExaminer())
            
        
        }).catch(err => {
            dispatch(studentToLecturerFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
    }
    
};


export const studentToLecturerStart = () => {
    return {
        type: actionTypes.STUDENT_TO_LECTURER_START
    }
}

export const studentToLecturerSuccess = (payload) => {
    return {
        type: actionTypes.STUDENT_TO_LECTURER_SUCCESS,
         payload
    }
}

export const studentToLecturerFail = (payload) => {
    return {
        type: actionTypes.STUDENT_TO_LECTURER_FAIL,
        payload
    };
};

export const studentToLecturerRefresh = () => {
    return {
        type: actionTypes.STUDENT_TO_LECTURER_REFRESH,
    };
};







export const examinerToStudentStart = () => {
    return {
        type: actionTypes.EXAMINER_TO_STUDENT_START
    }
}

export const examinerToStudentSuccess = (payload) => {
    return {
        type: actionTypes.EXAMINER_TO_STUDENT_SUCCESS,
         payload
    }
}

export const examinerToStudentFail = (payload) => {
    return {
        type: actionTypes.EXAMINER_TO_STUDENT_FAIL,
        payload
    };
};

export const examinerToStudentRefresh = () => {
    return {
        type: actionTypes.EXAMINER_TO_STUDENT_REFRESH,
    };
};

export const examinerOrLecturerToStudent = ({ comment, from, to, studentId, studentEmailId, status, role, lecturerId }) => {
    if (role === 'Examiner') {
    return (dispatch) => {  
        dispatch(examinerToStudentStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/mail/examinerToStudent', {
                comment,
                from,
                to,
                studentId,
                studentEmailId,
                status
        }).then(resp => {
            dispatch(examinerToStudentSuccess(resp.data))
            dispatch(getStudentMails(role, lecturerId))
        }).catch(err => {
            dispatch(getStudentMails(role, lecturerId))
            dispatch(examinerToStudentFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };    
    } else {
        return (dispatch) => {  
        dispatch(examinerToStudentStart());
        axios.post('http://localhost:8000/dcs.abu.edu.ng/mail/lecturerToStudent', {
                comment,
                from,
                to,
                studentId,
                studentEmailId,
                status
        }).then(resp => {
            dispatch(examinerToStudentSuccess(resp.data))
            dispatch(getStudentMails(role, lecturerId))
        }).catch(err => {
            dispatch(getStudentMails(role, lecturerId))
            dispatch(examinerToStudentFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))     
      })
    };
    }
    
};






//Get Courses ACTION
export const getCoursesStart = () => {
    return {
        type: actionTypes.GET_COURSES_START
    }
}

export const getCoursesSuccess = (payload) => {
    return {
        type: actionTypes.GET_COURSES_SUCCESS,
         payload
    }
}

export const getCoursesFail = (payload) => {
    return {
        type: actionTypes.GET_COURSES_FAIL,
        payload
    };
};

export const getCoursesRefresh = () => {
    return {
        type: actionTypes.GET_COURSES_REFRESH,
    };
};

export const getCourses = (role) => {
    if (role === 'Student') {
        return (dispatch) => {
        dispatch(getCoursesStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/lecturer/Record/all').then(resp => {
            dispatch(getCoursesSuccess(resp.data))
        }).catch(err => {
            dispatch(getCoursesFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    };
    } else {
        return (dispatch) => {
        dispatch(getCoursesStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/course/getAll').then(resp => {
            dispatch(getCoursesSuccess(resp.data))
        }).catch(err => {
            dispatch(getCoursesFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    };
    }
}

export const addCoursesStart = () => {
    return {
        type: actionTypes.ADD_COURSES_START
    }
}

export const addCoursesSuccess = (payload) => {
    return {
        type: actionTypes.ADD_COURSES_SUCCESS,
         payload
    }
}

export const addCoursesFail = (payload) => {
    return {
        type: actionTypes.ADD_COURSES_FAIL,
        payload
    };
};

export const addCoursesRefresh = () => {
    return {
        type: actionTypes.ADD_COURSES_REFRESH,
    };
};

export const addCourses = ({courseCode, courseTitle, creditUnit, adminId}) => {
    
        return (dispatch) => {
        dispatch(addCoursesStart());
            axios.post('http://localhost:8000/dcs.abu.edu.ng/course/', {
            courseCode, courseTitle, creditUnit, adminId
        }).then(resp => {
            dispatch(addCoursesSuccess(resp.data))
        }).catch(err => {
            dispatch(addCoursesFail(err.response !== undefined ? err.response.data.error : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    };

}


export const getStudentMailsStart = () => {
    return {
        type: actionTypes.GET_STUDENT_MAILS_START
    }
}

export const getStudentMailsSuccess = (payload) => {
    return {
        type: actionTypes.GET_STUDENT_MAILS_SUCCESS,
         payload
    }
}

export const getStudentMailsFail = (payload) => {
    return {
        type: actionTypes.GET_STUDENT_MAILS_FAIL,
        payload
    };
};

export const getStudentMailsRefresh = () => {
    return {
        type: actionTypes.GET_STUDENT_MAILS_REFRESH,
    };
};

export const getStudentMails = (role, lecturerId) => {
    if (role === 'Examiner') {
        return (dispatch) => {
        dispatch(getStudentMailsStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/mail/examinerInbox').then(resp => {
            dispatch(getStudentMailsSuccess(resp.data))
        }).catch(err => {
            dispatch(getStudentMailsFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    };
    } else {
       return (dispatch) => {
        dispatch(getStudentMailsStart());
        axios.get('http://localhost:8000/dcs.abu.edu.ng/mail/lecturerInbox/'+ lecturerId).then(resp => {
            dispatch(getStudentMailsSuccess(resp.data))
        }).catch(err => {
            dispatch(getStudentMailsFail(err.response !== undefined ? err.response.data.msg : ERROR_MESSAGE.NETWORK_FAILURE))
        })
    }; 
    }
    
}






