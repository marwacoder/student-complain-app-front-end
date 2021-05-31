import React from 'react';
import { Button } from '@material-ui/core'
import Loader from 'react-loader-spinner'
 
const button = (props) => {
    return (
        <Button
            disableRipple={props.disableRipple}
            disableFocusRipple={props.disableFocusRipple}
            disabled={props.disabled || props.valid ===false }
            type='submit'
            variant={props.variant}
            style={{ backgroundColor: '#19A15F', color: 'white', fontSize: 14 }}
            fullWidth
        ><span>{props.isLoading ? <Loader type="ThreeDots" 
                color="#f4f4f4"
                height={10}
                width={20} /> : props.buttonName}
              </span></Button>
    );
}
 
export default button;