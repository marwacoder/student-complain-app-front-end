import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { auth, history } from '../../store/actions'


import {
    Visibility, VisibilityOff,
    InputAdornment, IconButton
} from '../../mui';
import checkValidity from '../../helpers/validation/inputValidation'
import Input from '../../helpers/components/Input/Input';
import Button from '../../helpers/components/Button/Button'





class SignIn extends Component {
    state = {
        showPassword: false,
        controls: {

            user_id: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Username',
                    valuetype: 'user ID'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 9
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
                    minLength: 5,
                    maxLength: 12
                },
                valid: false,
                touched: false
            }


        }

    }
    componentDidMount(){
    const {isLoggedIn}=this.props.authState
    if (isLoggedIn) return history.push('/');
  }
    handleShowPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
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


    onSubmitHandler = (event) => {
        const { controls } = this.state
        event.preventDefault();
        this.props.onAuth(controls.user_id.value, controls.password.value);
    }

    render() {
        let { handlePage } = this.props
        let {controls}  = this.state
        const { isLoggedIn, isLoading, message } = this.props.authState
        let toggle = this.state.showPassword ? 'text' : 'password'
        let inputAdonment = {

            endAdornment: <InputAdornment position="end" style={{ paddingBottom: 7 }}>
                <IconButton aria-label="Toggle password visibility"
                    onClick={this.handleShowPassword}>
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        };
        let authRedirect = null;
        if (isLoggedIn) {
            authRedirect = <Redirect to ='/'/>
        }
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        return (
            <div className="auth-container">
                {authRedirect}
                <form onSubmit={this.onSubmitHandler}>
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

                                key={formElement.id} />
                            
                        ))}
                        
                    </div>
                    <div className="item item--3">
                        <Button
                            valid={controls.user_id.valid === false ? false :
                            controls.password.valid === false ? false : null}
                            disableRipple={isLoading}
                            disableFocusRipple={isLoading}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="btn auth-btn"
                            variant={'contained'}
                            buttonName={'SIGN IN'}
                            
                        />
                        
                    </div>
                    <div className="item item--4">
                        <div><p id="forgot" onClick={()=>handlePage(2)}>Forgot password?</p></div>
                        <div><p id="quick">Quick access with</p></div>
                    </div>
                </form>
        
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
  return {
    authState:state.isAuthenticated,
    
    /***sign up module global state***/
    
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (user_id, password) => dispatch(auth(user_id, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

