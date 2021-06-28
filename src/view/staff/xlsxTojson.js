import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as XLSX from "xlsx";
import { Card, MenuItem } from '../../mui'
import { Box, TextField, Grid, } from '@material-ui/core'

import checkValidity from '../../helpers/validation/inputValidation'
import Button from '../../helpers/components/Button/Button'
import Snackbars from '../../helpers/components/snackbar'
import { postStudent, postStudentRefresh } from '../../store/actions'

const gender = [{ 'value': 'Male', 'label': 'Male' }, { 'value': 'Female', label: 'Female' },]
const level = [{ 'value': 'UG-1', 'label': 'UG-1' }, { 'value': 'UG-2', 'label': 'UG-2' },
{ 'value': 'UG-3', 'label': 'UG-3' }, { 'value': 'UG-4', 'label': 'UG-4' }]

const ITEMS = []
class XlsxToJson extends Component {
    state = {
        items: [],
        anchorEl: null,
    }

    onHandleSnack = () => {
        this.props.refresh()
    }


    readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const { items } = this.state
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            this.setState({ items: d });

        });
    };



    onSubmitHandler = (event) => {
        const { controls, items } = this.state
        let role = 'Student'
        event.preventDefault()
        this.props.onCreateAccount(
            items
        );
    }
    inputChangedHandler = (event, inputIdentifier) => {

    }
    render() {
        const { message, error, isLoading } = this.props.post
        const { items } = this.state

        return (
            <div>
                <div >

                    <Card>
                        <div className="form-container">
                            <form onSubmit={this.onSubmitHandler} autoComplete="false">

                                <div className="item item--1">
                                    <div></div>
                                    <Grid container justify='flex-start' alignContent='center' spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.studentId)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Student ID' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.name)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Name' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.gender)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Gender' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.level)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} className="input" label='Select Level' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.email)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Email Address' />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField fullWidth value={items.map(val => val.phoneNumber)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Phone Number' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField type='password' fullWidth value={items.map(val => val.password)} variant='outlined' inputProps={{ style: { fontSize: 14 } }}
                                                InputLabelProps={{
                                                    style: { fontSize: 12 }
                                                }} label='Password' />
                                        </Grid>
                                    </Grid>

                                </div>
                                <Box my={3}>
                                    <input type='file' onChange={(e) => {
                                        const file = e.target.files[0];
                                        this.readExcel(file);
                                    }} />
                                </Box>
                                <div className="item">
                                    <Button
                                        valid={items.length <= 0 ? false : true}
                                        disableRipple={isLoading}
                                        disableFocusRipple={isLoading}
                                        disabled={isLoading}
                                        isLoading={isLoading}
                                        className="btn auth-btn"
                                        type='submit'
                                        variant={'outlined'}
                                        buttonName={'CREATE STUDENTS'}
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
        onCreateAccount: (items) =>
            dispatch(postStudent(items)),
        refresh: () => dispatch(postStudentRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(XlsxToJson);