import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Card, MenuItem} from '../../mui'
import Input from '../../helpers/components/Input/Input'
import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import { amendUserProfile, amendUserProfileRefresh } from '../../store/actions';


class Account extends Component {
    state = {
        anchorEl : null,
            controls: {
                examinerId: {
                elementType: 'input',
                    elementConfig: {
                    unedit: true,
                    type: 'text',
                    label: 'Staff ID',
                    valuetype: 'User ID'
                },
                value: this.props.auth.examinerId,
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
                    unedit: true,
                    type: 'text',
                    label: 'Name',
                    valuetype: 'name'
                },
                value: this.props.auth.name,
                validation: {
                    required: true,
                    },
                
                valid: false,
                touched: false

                },
            gender: {
                elementType: 'input',
                elementConfig: {
                    unedit: true,
                    type: '',
                    label: 'Gender',
                    valuetype: 'gender'
                },
                value: this.props.auth.gender,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            
            email: {
                elementType: 'input',
                elementConfig: {
                    unedit: false,
                    type: '',
                    label: 'Email Address',
                    valuetype: 'email'
                },
                value: this.props.auth.email,
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
                },
            phone: {
                elementType: 'input',
                elementConfig: {
                    unedit: false,
                    type: 'text',
                    label: 'Phone Number',
                    valuetype: 'phone number'
                },
                value: this.props.auth.phoneNumber,
                validation: {
                    required: true,
                    isPhone: true
                },
                valid: false,
                touched: false
                },
            password: {
                elementType: 'input',
                elementConfig: {
                    unedit: false,
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
            
        }
    }

    onHandleSnack = () => {
        this.props.refresh()
    }
    componentDidMount() {
       
       
    }
    onSubmitHandler = (event) => {
       const { controls } = this.state;
        event.preventDefault();
        this.props.amend({
            id: this.props.auth.examinerId, phoneNumber: controls.phone.value,
            email: controls.email.value, password: controls.password.value
        })
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
         const {  isLoading, message, error } = this.props.profile;
        
       const {controls} = this.state
      console.log(controls,'controls')
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
                                changed={formElement.config.elementConfig.unedit === true ? (e)=>e.preventDefault()
                                    :(event) => this.inputChangedHandler(event, formElement.id)}
                                
                                key={formElement.id} />
                        ))}
                                   </div>
                    <div className="item">
                                     <Button
                                        
                           valid={controls.email.value === '' ? false : controls.password.value === '' ? false : controls.phone.value === '' ? false : null}
                
                                        
                            disableRipple={isLoading}
                            disableFocusRipple={isLoading}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="btn auth-btn"
                            variant={'outlined'}
                            buttonName={'AMEND ACCOUNT'}
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
        auth: state.isAuthenticated.data[0],
        profile: state.profile

  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
      amend: (id,phoneNumber, email, password) => dispatch(amendUserProfile(id, phoneNumber, email, password)),
      refresh: () => dispatch(amendUserProfileRefresh()),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Account);