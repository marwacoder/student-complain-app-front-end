/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  complain,
  getUser,
  getComment,
  complainRefresh,
} from "../../store/actions";
import checkValidity from "../../helpers/validation/inputValidation";
import Input from "../../helpers/components/Input/Input";
import Button from "../../helpers/components/Button/Button";
import Snackbars from "../../helpers/components/snackbar";
import { Popover, AddIcon, Fab, withStyles, MenuItem } from "../../mui";
import { ActionsStyles } from "../../styles/styles";
import {
  getCourses,
  getExaminer,
  studentToExaminerOrLecturer,
  studentToExaminerRefresh,
  studentToLecturer,
  studentToLecturerRefresh,
} from "../../store/actions/";
import course from "../../store/reducers/courses";

//const messages = [{ 'value': 'Lost of script', 'label': 'Lost of script' }, { 'value': 'score to low', label: 'score to low' }]
const resultType = [
  { value: "Exam Result", label: "Exam Result" },
  { value: "Test Result", label: "Test Result" },
];

const examMessage = [{ value: "Score too low", label: "Score too low" }];
const testMessage = [{ value: "Lost of script", label: "Lost of script" }];

class Student extends Component {
  state = {
    openSnack: "No",
    anchorEl: null,
    email: null,
    lecturerId: null,
    controls: {
      complainType: {
        elementType: "select",
        elementConfig: {
          type: "text",
          label: "Complain Type",
          valuetype: "complain type",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      course: {
        elementType: "select",
        elementConfig: {
          type: "text",
          label: "Select Course",
          valuetype: "select course",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      message: {
        elementType: "select",
        elementConfig: {
          type: "",
          label: "Select Message",
          valuetype: "message",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    const { role } = this.props.auth[0];
    this.props.fetchExaminer();
    this.props.courses(role);
  }
  handleClickOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...this.state.controls,
    };
    const updatedControlsElement = {
      ...updatedControls[inputIdentifier],
    };
    updatedControlsElement.value = event.target.value;
    updatedControlsElement.valid = checkValidity(
      updatedControlsElement.value,
      updatedControlsElement.validation
    );
    updatedControlsElement.touched = true;
    updatedControls[inputIdentifier] = updatedControlsElement;
    this.setState({ controls: updatedControls });
  };
  onSubmitHandler = (event) => {
    const { examiner, auth, course } = this.props;
    const { controls, email, lecturerId } = this.state;

    event.preventDefault();
    this.props.onComplain({
      complainType: controls.complainType.value,
      message: controls.message.value,
      from: auth[0].email,
      to: examiner[0].email,
      studentId: auth[0].studentId,
      courseId: controls.course.value,
      lecturerId,
    });
  };
  onHandleSnack = () => {
    this.props.refresh();
  };

  render() {
    const { classes, course, examiner, auth, mail } = this.props;
    const { isLoading, error, message } = this.props.mail;

    let { controls } = this.state;
    console.log(controls.complainType.value, "complainType");
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    return (
      <div>
        <Fab
          color="primary"
          onClick={this.handleClickOpen}
          size="small"
          aria-label="add"
          className={classes.addButton}>
          <AddIcon />
        </Fab>
        <div>
          <Popover
            className="student-pop-over"
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}>
            <div className="pop-over-form">
              <div className="complain-container">
                <form onSubmit={this.onSubmitHandler} autoComplete="false">
                  <div className="item item--1">
                    {formElementArray.map((formElement) => (
                      <Input
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        variant="outlined"
                        touched={formElement.config.touched}
                        valueType={formElement.config.elementConfig.valuetype}
                        changed={(event) =>
                          this.inputChangedHandler(event, formElement.id)
                        }
                        comtype={resultType.map((option, i) => (
                          <MenuItem key={i} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                        message={
                          controls.complainType.value === "Exam Result"
                            ? examMessage.map((option, i) => (
                              <MenuItem key={i} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                            : testMessage.map((option, i) => (
                              <MenuItem key={i} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                        }
                        coursetype={
                          course &&
                          Array.isArray(course) &&
                          course.map((option, i) => (
                            <MenuItem
                              onClick={() =>
                                this.setState({
                                  lecturerId: option.lecturerId,
                                })
                              }
                              key={i}
                              value={option.course.courseId ? option.course.courseId : null}>
                              {option.course.courseTitle +
                                ` (${option.course.courseCode})`}
                            </MenuItem>
                          ))
                        }
                        key={formElement.id}
                      />
                    ))}
                  </div>

                  <div className="item item--3">
                    <Button
                      valid={
                        controls.complainType.valid === false
                          ? false
                          : controls.message.valid === false
                            ? false
                            : controls.course.valid === false
                              ? false
                              : null
                      }
                      disableRipple={isLoading}
                      disableFocusRipple={isLoading}
                      disabled={isLoading}
                      isLoading={isLoading}
                      className="btn auth-btn"
                      variant={"outlined"}
                      buttonName={"SUBMIT"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Popover>
        </div>
        <Snackbars
          variant={"success"}
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
    examiner: state.examiner.data,
    mail: state.mail,
    course: state.course.data,
    auth: state.isAuthenticated.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExaminer: () => dispatch(getExaminer()),
    onComplain: (complainType, message, from, to, studentId, courseId) =>
      dispatch(
        studentToExaminerOrLecturer(
          complainType,
          message,
          from,
          to,
          studentId,
          courseId
        )
      ),
    onComment: (id) => dispatch(getComment(id)),
    refresh: () => dispatch(studentToExaminerRefresh()),
    refresh2: () => dispatch(studentToLecturerRefresh()),
    courses: (role) => dispatch(getCourses(role)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(ActionsStyles, { withTheme: true })(Student));
