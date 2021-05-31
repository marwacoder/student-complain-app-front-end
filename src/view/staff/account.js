import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Card, MenuItem} from '../../mui'
import Input from '../../helpers/components/Input/Input'
import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import {register, createAccountRefresh} from '../../store/actions'

const gender = [{ 'value': 'male', 'label': 'Male' }, { 'value': 'female', label: 'Female' },]
const level = [{ 'value': '100', 'label': '100' }, { 'value': '200', 'label': '200' },
    { 'value': '300', 'label': '300' }, { 'value': '400', 'label': '400' }]
const role = [{ 'value': 'admin', 'label': 'Admin' }, { 'value': 'user', label: 'User' },]

class Account extends Component {
    state = {
        anchorEl : null,
            controls: {
                userId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Staff/Student ID',
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
            role: {
                elementType: 'select',
                elementConfig: {
                    type: '',
                    label: 'select role',
                    valuetype: 'role'
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
    onSubmitHandler = (event) => {
        const {controls} = this.state
        event.preventDefault()
        this.props.onCreateAccount(
            controls.userId.value,
            controls.name.value,
            controls.gender.value,
            controls.level.value,
            controls.email.value,
            controls.phone.value,
            controls.password.value,
            controls.role.value,
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
                                level={level.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                                role={role.map((option, i) => (
                                    <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                                ))}
                                key={formElement.id} />
                        ))}
                                   </div>
                    <div className="item">
                                <Button
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
    post: state.post
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateAccount: (user_id, name, gender, level, email, phone, password, role) =>
            dispatch(register(user_id, name, gender, level, email, phone, password, role)),
        refresh: ()=> dispatch(createAccountRefresh())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);