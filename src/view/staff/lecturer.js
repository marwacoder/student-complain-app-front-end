import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Card, MenuItem} from '../../mui'
import Input from '../../helpers/components/Input/Input'
import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import { postLecturer, getCourses, postLecturerRefresh } from '../../store/actions';


const gender = [{ 'value': 'Male', 'label': 'Male' }, { 'value': 'Female', label: 'Female' },]


class Account extends Component {
    state = {
        anchorEl : null,
            controls: {
                lecturerId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Staff ID',
                    valuetype: 'User ID'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                    maxLength: 9
                    },
                
                valid: false,
                touched: false

            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Name',
                    valuetype: 'name'
                },
                value: '',
                validation: {
                    required: true,
                    },
                
                valid: false,
                touched: false

                },
            gender: {
                elementType: 'select',
                elementConfig: {
                    type: '',
                    label: 'Gender',
                    valuetype: 'gender'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: '',
                    label: 'Email Address',
                    valuetype: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
                },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                    valuetype: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 8
                },
                valid: false,
                touched: false
                },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Phone Number',
                    valuetype: 'phone number'
                },
                value: '',
                validation: {
                    required: true,
                    isPhone: true
                },
                valid: false,
                touched: false
                },
            course: {
                elementType: 'select',
                elementConfig: {
                    type: '',
                    label: 'Assign Course',
                    valuetype: 'select course'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        }
    }

    onHandleSnack = () => {
        this.props.refresh()
    }
    componentDidMount() {
        const {role} = this.props.auth
        this.props.courses(role)
    }
    onSubmitHandler = (event) => {
        const {controls} = this.state
        let role = 'Lecturer'
        event.preventDefault()
        this.props.onCreateAccount({
            lecturerId: controls.lecturerId.value,
            name: controls.name.value,
            gender: controls.gender.value,
            email: controls.email.value,
            phoneNumber: controls.phone.value,
            password: controls.password.value,
            role,
            courseId: controls.course.value
            }
        );
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControlsElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedControlsElement.value = event.target.value;
        updatedControlsElement.valid = checkValidity(updatedControlsElement.value, updatedControlsElement.validation)
        updatedControlsElement.touched = true;
        updatedControls[inputIdentifier] = updatedControlsElement;
        this.setState({ controls: updatedControls });
    }
    render() { 
        let formElementArray = [];
        const { course } = this.props
       const {controls} = this.state
        const { message, error, isLoading } = this.props.post
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        return (
            <div>
                 <div className="account-container">
                
                <Card>  
                    <div className="form-container">
                        <form onSubmit={this.onSubmitHandler} autoComplete="false">
                            
                            <div className="item item--1">
                            <div></div>
                        {formElementArray.map(formElement => (
                            <Input elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                inValid={!formElement.config.valid}
                                variant='outlined'
                                touched={formElement.config.touched}
                                valueType={formElement.config.elementConfig.valuetype}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                gender={gender.map((option, i) => (
                                    <MenuItem key={option} value={option.value}>{option.label}</MenuItem>
                                ))}
                                coursetype={typeof course !== 'undefined' && course.map((option, i) => (
                                    <MenuItem key={i} value={option.courseId}>{option.courseTitle +` (${option.courseCode})`}</MenuItem>
                                ))}
                                key={formElement.id} />
                        ))}
                                   </div>
                    <div className="item">
                                    <Button
                                         valid={controls.lecturerId.valid === false ? false :
                                            controls.name.valid === false ? false : controls.gender.valid === false ? false :
                            controls.email.valid === false ? false: controls.password.valid === false ? false: controls.course.valid === false ? false: controls.phone.valid === false ? false: null}
                            
                            disableRipple={isLoading}
                            disableFocusRipple={isLoading}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="btn auth-btn"
                            variant={'outlined'}
                            buttonName={'CREATE ACCOUNT'}
                        />
                    </div>
                </form>

                            </div> 
                </Card>
                
            </div>
                                <Snackbars
                    variant={'success'}
                    handleClose={this.onHandleSnack}
                    message={message}
                    isOpen={error === false}
            />
                  <Snackbars
                    variant={"error"}
                    handleClose={this.onHandleSnack}
                    message={message}
                    isOpen={error === true}
                />
            </div>
           
        );
    }
}
const mapStateToProps = (state) => {
  return {
      post: state.lecturer,
      course: state.course.data,
      auth: state.isAuthenticated.data[0]
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAccount: (user_id, name, gender, level, email, phone, password, role, courseId) =>
            dispatch(postLecturer(user_id, name, gender, level, email, phone, password, role, courseId)),
        refresh: () => dispatch(postLecturerRefresh()),
        courses: (role)=> dispatch(getCourses(role))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);