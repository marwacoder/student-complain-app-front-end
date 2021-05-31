import React from 'react';
import { connect } from 'react-redux'
import Student from '../profile/student';
import Admin from '../profile/Admin';
import Examiner from '../profile/Examiner';
import Lecturer from '../profile/lecturer'
import PropTypes from 'prop-types';
 
const Profile = (props) => {
    return (
        <div>
            {props.params.role === 'Student' && <Student />}
            {props.params.role === 'Admin' && <Admin />}
            {props.params.role === 'Examiner' && <Examiner />}
            {props.params.role === 'Lecturer' && <Lecturer/>}
        </div>
    );
}


 
Profile.propTypes = {};
const mapStateToProps = (state) => {
  return {
    
    params: state.isAuthenticated.data[0]
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
 
