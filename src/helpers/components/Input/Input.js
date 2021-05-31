import React from 'react';
import { TextField, FormHelperText } from '../../../mui';

const Input = (props) => {
    let inputElement = null;
    let validationError = `Please enter a valid ${props.valueType}`;
    switch (props.elementType) {
        case ( 'input' ):
            inputElement = <><TextField margin="dense"
                id="outlined-primary"
                
                InputProps={props.inputProps}
                error = {props.inValid && props.touched}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{
                    style: { fontSize: 12}
                }}
                variant = {props.variant}
                margin={props.margin}
                className="input" 
                {...props.elementConfig}
                onChange={ props.changed }
                value={props.value} />
                {props.inValid && props.touched &&
                <div className="formHelper-text"><FormHelperText className="formHelper">
                {validationError}</FormHelperText></div>}
                </>
            break;
        case ( 'select' ):
            inputElement = <><TextField margin="dense"
                InputProps={props.inputProps}
                error = {props.inValid && props.touched}
                inputProps={{ style: { fontSize: 14 } }}
                
                select
                InputLabelProps={{ style: { fontSize: 12 }}}
                variant = {props.variant}
                margin={props.margin}
                className="input" {...props.elementConfig}
                onChange={props.changed}
                value={props.value} >
                {props.elementConfig.valuetype === 'gender' && props.gender}
                {props.elementConfig.valuetype === 'level' && props.level}
                {props.elementConfig.valuetype === 'role' && props.role}
                {props.elementConfig.valuetype === 'complain type' && props.comtype}
                {props.elementConfig.valuetype === 'select course' && props.coursetype}
                {props.elementConfig.valuetype === 'message' && props.message}
                
            </TextField>
                {props.inValid && props.touched &&
                <div className="formHelper-text"><FormHelperText className="formHelper">
                {validationError}</FormHelperText></div>}
                </>
            break;
        case ('textarea'):
            inputElement =<> <TextField
                error = {props.inValid && props.touched}
                inputProps={{ style: { fontSize: 14, borderColor: '#19A15F'} }}
                InputLabelProps={{ style: { fontSize: 12}}}
                className="input" {...props.elementConfig}
                label={'complain'}
                variant={props.variant}
                margin={props.margin}
                onChange={props.changed}
                value={props.value}
                rows='5'
                multiline
            />
                {props.inValid && props.touched &&
                <div className="formHelper-text"><FormHelperText className="formHelper">
                {validationError}</FormHelperText></div>}
                </>
            break;
        default:
            inputElement = <><TextField margin="dense"
                InputProps={props.inputProps}
                error={props.inValid && props.touched}
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                variant={props.variant}
                label={props.label}
                className="input" {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
                {props.inValid && props.touched &&
                <div className="formHelper-text"><FormHelperText className="formHelper">
                {validationError}</FormHelperText></div>}
            </>
    }
    return (
        <div className="text-field">
            {inputElement}
        </div>
    );
        }
 
export default Input;