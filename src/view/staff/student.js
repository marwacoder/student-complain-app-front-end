import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Card, MenuItem } from '../../mui'
import {Box} from '@material-ui/core'
import Input from '../../helpers/components/Input/Input'
import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import {postStudent,  postStudentRefresh} from '../../store/actions'

const gender = [{ 'value': 'Male', 'label': 'Male' }, { 'value': 'Female', label: 'Female' },]
const level = [{ 'value': 'UG-1', 'label': 'UG-1' }, { 'value': 'UG-2', 'label': 'UG-2' },
    { 'value': 'UG-3', 'label': 'UG-3' }, { 'value': 'UG-4', 'label': 'UG-4' }]

class Account extends Component {
    state = {
        anchorEl : null,
            controls: {
                studentId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Student ID',
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
            level: {
                elementType: 'select',
                elementConfig: {
                    type: '',
                    label: 'select level',
                    valuetype: 'level'
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
        }
    }

    onHandleSnack = () => {
        this.props.refresh()
    }
    onSubmitHandler = (event) => {
        const {controls} = this.state
        let role = 'Student'
        event.preventDefault()
    
        this.props.onCreateAccount(
            [{
            studentId: controls.studentId.value,
            name: controls.name.value,
            gender: controls.gender.value,
            email: controls.email.value,
            phoneNumber: controls.phone.value,
            level: controls.level.value,
            password: controls.password.value,
            role
        }]
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
        const { message, error, isLoading } = this.props.post
        const {controls} = this.state
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        return (
            <div>
                 <div >
                
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
                                level={level.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                                
                                key={formElement.id} />
                        ))}
                                   </div>
                    <div className="item">
                                    <Button
                                  valid={controls.studentId.valid === false ? false :
                                            controls.name.valid === false ? false : controls.gender.valid === false ? false :
                            controls.email.valid === false ? false: controls.password.valid === false ? false: controls.level.valid === false ? false: controls.phone.valid === false ? false: null}
                                  
                            disableRipple={isLoading}
                            disableFocusRipple={isLoading}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="btn auth-btn"
                                        variant={'outlined'}
                                        type="submit"
                            buttonName={'CREATE Student'}
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
    post: state.student
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAccount: (studentId, name, gender, level, email, phone, password, role) =>
            dispatch(postStudent(studentId, name, gender, level, email, phone, password, role)),
        refresh: ()=> dispatch(postStudentRefresh())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);