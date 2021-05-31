import React from 'react';
import {Popover} from '../../../mui'
 
const PopOver = (props, form) => {
    
    return (
        <div>
            <Popover
            id={props.id}
                    style={{maxHeight: '70%'}}
                    open={props.open}
                    anchorEl={props.anchorEl}
                    onClose={props.handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
            >
                hello
            </Popover>
            
        </div>
    );
}
 
export default PopOver;