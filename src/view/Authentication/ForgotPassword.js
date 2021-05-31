import React, { Component } from 'react';

import Button  from '../../helpers/components/Button/Button'
import Input from '../../helpers/components/Input/Input';
import checkValidity from '../../helpers/validation/inputValidation'






class ForgotPassword extends Component {
    state = {
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

            }
        }
    }
    
    
    resetPasswordHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
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
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        return (
            <div className="auth-container">
                <form autoComplete="false" onSubmit={this.resetPasswordHandler}>
                    <div className="instuction">
                        <p>Please enter your email and an instruction will be send to you on how to reset your password</p>
                    </div>
                    <div className="item item--1">

                        {formElementArray.map(formElement => (
                            <Input elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                inValid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                valueType={formElement.config.elementConfig.valuetype}
                                inputProps={{
                                    style: {fontSize: 14}
                                }}
                                key={formElement.id} />
                        ))}
                    </div>
                    <div className="item item--3">
                        <Button
                            className="btn auth-btn"
                            variant={'contained'}
                            buttonName={'RESET PASSWORD'}
                        />
                    </div>
                    <div className="item item--4">
                    <div><p id="quick">Quick access with</p></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default (ForgotPassword);

