import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Visibility, VisibilityOff,
    InputAdornment, IconButton
} from '../../mui';
import Input from '../../helpers/components/Input/Input';
import Button from '../../helpers/components/Button/Button'
import checkValidity from '../../helpers/validation/inputValidation'

import {auth} from '../../store/actions/auth'



class Register extends Component {
    state = {
        showPassword: false,
        controls: {
            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
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
                    type: '',
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
            }
            

        }
        
    }
    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedControlsElement = {
            ...updatedControls[inputIdentifier]
        };
        console.log(updatedControls, 'controls')
        updatedControlsElement.value = event.target.value;
        updatedControlsElement.valid = checkValidity(updatedControlsElement.value, updatedControlsElement.validation)
        updatedControlsElement.touched = true;
        updatedControls[inputIdentifier] = updatedControlsElement;
        this.setState({ controls: updatedControls });
    }

    handleShowPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    }

    render() { 
        let toggle = this.state.showPassword ? 'text' : 'password'
        let inputAdonment =  {
           
            endAdornment: <InputAdornment position="end" style={{ paddingBottom: 7 }}>
                <IconButton aria-label="Toggle password visibility"
                    onClick={this.handleShowPassword}>
                    {this.state.showPassword ? <Visibility id="visibility"/> : <VisibilityOff id="visibility"/>}
                </IconButton>
            </InputAdornment>
        };
        
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        return (
            <div className="auth-container">
                <form autoComplete="false" onSubmit={this.submitHandler}>
                    <div className="item item--1">
                        {formElementArray.map(formElement => (
                            <Input elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig['label']
                                    === 'Password' && (formElement.config.elementConfig['type'] = toggle)
                                }
                                elementConfig={formElement.config.elementConfig}
                                inputProps={formElement.config.elementConfig['label']
                                    === 'Password' ? inputAdonment : null}
                                value={formElement.config.value}
                                inValid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                valueType={formElement.config.elementConfig.valuetype}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                
                            key = {formElement.id}/>
                       ))}
                </div>
                <div className="item item--3">
                        <Button
                            className="btn auth-btn"
                            variant={'contained'}
                            buttonName={'CREATE ACCOUNT'}
                            />
                </div>
                <div className="item item--4">
                        <div><p>By creating an account you agree to <span style={{ fontWeight: "bold", color: 'black'}}>Sabitrade's</span> </p></div>
                        <div><span id="terms">Terms of Use</span> and <span id="terms">Privacy Policy</span></div>
                    <div><p id="quick">Quick access with</p></div>
                    </div>
                </form>
            </div>
        );
    }
}
 

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Register);

