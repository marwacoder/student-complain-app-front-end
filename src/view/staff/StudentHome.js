import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Button } from '@material-ui/core'
import Student from './student'
import XlsxToJson from './xlsxTojson'
 
const StudentHome = () => {
    const [showXlsx, setShowXlsx] = React.useState(false)
    
    return (
        <Box>
           
            <Grid container justify='flex-start' alignContent="flex-start" spacing={1}>
                 <Grid item xs={12} sm={6}>
                    <Student />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <XlsxToJson />  
               </Grid>
        </Grid>
        </Box>
    );
}
 
StudentHome.propTypes = {};
 
export default StudentHome;