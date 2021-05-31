import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkValidity from '../../helpers/validation/inputValidation'
import Input from '../../helpers/components/Input/Input';
import Buttonn from '../../helpers/components/Button/Button'

import Snackbars from '../../helpers/components/snackbar'
import {
    Popover, Description, withStyles, MenuItem, Dialog,
    Button, Divider, Menu, CheckIcon, CloseIcon, TextField,
} from '../../mui'
import { ActionsStyles } from '../../styles/styles'
import {auth, examinerOrLecturerToStudent, examinerToStudentRefresh} from '../../store/actions'

 
class Staff extends Component {


    state = {
        anchorEl: null,
        anchorEll: null,
        status: null,
        comment: '',
        open: false,
            controls: {
            complainType: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Complain Type',
                    valuetype: 'complain type'
                },
                value: this.props.complainType,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false

            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    type: '',
                    label: 'type your complain',
                    valuetype: 'message'
                },
                value: this.props.message,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            



        }
    }
    CalloutOpen = (event) => {
        event.preventDefault()
        this.setState({ anchorEll: event.currentTarget });
      };
        handleClickOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget})
      }
      handleClose = () => {
        this.setState({ 
          anchorEl : null
        })
    }
    handleDialogOpen = () => {
          this.setState({
              open : !this.state.open,
          })
        }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
            
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

    
onHandleSnack = () => {
    this.props.refresh()
  }
    onSubmitHandler = (event) => {
        event.preventDefault();
        const { studentId, emailId, complainType,examiner, message, email, auth} = this.props;
        const { comment, status } = this.state;
        
        this.props.onComment({
            comment,
            from: auth[0].email,
            to: email,
            studentId,
            complainType,
            message,
            studentEmailId: emailId,
            status,
            role: auth[0].role,
            lecturerId: auth[0].lecturerId
        });
    }


    render() { 
        const open = Boolean(this.state.anchorEl);
        const { anchorEll, controls } = this.state
        const { error, message, isLoading } = this.props.data
        const { classes } = this.props
        const id = open ? 'simple-popover' : undefined;
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        return (
            <div>
               <div>
                    <Button onClick={this.handleClickOpen}><Description style={{color: '#19A15F' }}/></Button>
             
                </div>
                <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                    onClose={this.handleDialogOpen}
      
                >
                    <div style={{ width: 340, }}>
                    <div className="complain-container">
                        <form onSubmit={this.onSubmitHandler} autoComplete="false">
                                <div style={{paddingBottom: 10}}>
                <TextField
                name="comment"
                label="Write a comment"
                value={this.state.comment}
                onChange={this.onChangeHandler}
                margin="dense"
                rows="3"
                multiline
                variant="outlined"
                style={{width: 300}}
                            />
                                </div>
                                <div style={{paddingBottom: -10}}>
                            <Buttonn
                            valid={this.state.comment === "" ? false :null}
                            disableRipple={isLoading}
                            disableFocusRipple={isLoading}
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="btn auth-btn"
                            variant={'outlined'}
                            buttonName={'SUBMIT'}
                                        />
                                </div>
                          
                                        
                        </form>
                        </div>
                        </div>
              </Dialog>
                <div >
                    <Popover
                    className="staff-pop-over"
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    >
                        <div className="pop-over-form">
                    <div className="complain-container">
                        <form onSubmit={this.CalloutOpen} autoComplete="false">
                    <div className="item item--1">
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
                                    
                                    <div className="item ">
                        <Menu
                      id="simple-menu"
                      anchorEl={anchorEll}
                      transformOrigin={{ vertical: "top"}}
                      open={Boolean(anchorEll)}
                      onClose={() => this.setState({ anchorEll: null })}
                      style={{ marginTop: 30 }} classes={{ paper: classes.menu }}
                    >
                      <MenuItem  onClick={()=>this.setState({open: true, status: 'Approved'})} ><CheckIcon  style={{color: 'green'}}/> <div style={{paddingLeft: 10}}> Approve</div> </MenuItem>
                    
                    <Divider />
                    <MenuItem onClick={()=>this.setState({open: true, status: 'Rejected'})} ><CloseIcon style={{color: 'red'}}/><div style={{paddingLeft: 10}}>Reject</div> </MenuItem>                                            </Menu>
                        <Buttonn
                        valid={controls.complainType.value === "" ? false :
                            controls.message.value === "" ? false  : null}
                        
                            className="btn auth-btn"
                            variant={'outlined'}
                            buttonName={'RESPOND'}
                                        />
                                        
                    </div>
                </form>

                            </div>
                            </div>
                                </Popover>
                
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
      data: state.mail,
    auth: state.isAuthenticated.data
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onComment: (comment, from, to, studentId, studentEmailId, status) => dispatch(examinerOrLecturerToStudent(comment, from, to, studentId, studentEmailId, status)),
        refresh: ()=> dispatch(examinerToStudentRefresh())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ActionsStyles, { withTheme: true })(Staff));
