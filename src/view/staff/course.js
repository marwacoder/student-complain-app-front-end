import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Card, MenuItem } from '../../mui'
import {Box, Grid} from '@material-ui/core';
import Input from '../../helpers/components/Input/Input'
import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import {addCourses, addCoursesRefresh} from '../../store/actions'



class Account extends Component {
    state = {
        anchorEl : null,
        controls: {
                courseTitle: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Course Title',
                    valuetype: 'course title'
                },
                value: '',
                validation: {
                    required: true,
                    },
                
                valid: false,
                touched: false

                },
                courseCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Course Code',
                    valuetype: 'Course Code'
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
            
            creditLoad: {
                elementType: 'input',
                elementConfig: {
                    type: '',
                    label: 'Credit Unit',
                    valuetype: 'credit unit'
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


    componentDidMount() {
        
    }
    onHandleSnack = () => {
        this.props.refresh()
    }
    onSubmitHandler = (event) => {
        const { controls } = this.state;
        const { auth } = this.props;
        event.preventDefault()
        this.props.onCreateCourse({
            courseTitle: controls.courseTitle.value,
            creditUnit: controls.creditLoad.value,
            courseCode: controls.courseCode.value,
            adminId: auth.staffId
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
        const {controls} =this.state
        let formElementArray = [];

        const { message, error, isLoading } = this.props.post;
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
                                key={formElement.id} />
                        ))}
                                   </div>
                    <div className="item">
                                    <Button
                                        valid={controls.courseTitle.valid === false ? false :
                                            controls.courseCode.valid === false ? false :
                                                controls.creditLoad.valid === false ? false : null}
                            // disableRipple={isLoading}
                            // disableFocusRipple={isLoading}
                            // disabled={isLoading}
                            // isLoading={isLoading}
                            className="btn auth-btn"
                            variant={'outlined'}
                            buttonName={'ADD COURSE'}
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
      post: state.course,
      auth: state.isAuthenticated.data[0]
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        
        onCreateCourse: (courseCode, courseTitle, creditUnit, adminId) =>
            dispatch(addCourses(courseCode, courseTitle, creditUnit, adminId)),
        refresh: ()=> dispatch(addCoursesRefresh())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);