import { combineReducers } from 'redux';

import { isAuthenticated } from './reducers/auth'
import { post } from './reducers/post'
import { profile } from './reducers/profile'
import {destroy} from './reducers/delete'
import { fetch } from './reducers/fetch';
import { course } from './reducers/courses';
import { examiner } from './reducers/examiner';
import { student } from './reducers/student';
import { lecturer } from './reducers/lecturer';
import { mail } from './reducers/mail';


export const reducers = {
  isAuthenticated,
  post,
  profile,
  destroy,
  fetch,
  course,
  examiner,
  student,
  lecturer,
  mail
};


const rootReducer = combineReducers({
  ...reducers,
});


export default rootReducer;