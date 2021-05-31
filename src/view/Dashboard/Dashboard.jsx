import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {getComment} from '../../store/actions'
import Rejected from './rejected/rejected'
import Approved from './approved/approved'
import Pending from './pending/pending'
import TotalUsers from './totalusers/totalusers'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
  }
}));

const Dashboard = () => {
 
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getComment({role: role}))
  }, []);
  

  const mails = useSelector(state => state.fetch.data);
  const role = useSelector(state => state.isAuthenticated.data[0]['role'])
  
  
  let i = 0
  let j = 0
  let k = 0
  let t = 0
  
  const pending = Array.isArray(mails) && mails.map(element => {
    return   element.status === 'Pending' && i++
    
  })

  const approved = Array.isArray(mails) && mails.map(element => {
    return   element.status === 'Approved' && j++
    
  })

  const rejected = Array.isArray(mails) && mails.map(element => {
    return   element.status === 'Rejected' && k++
    
  })

const total = Array.isArray(mails) && mails.map(element => {
    return   element && t++
    
  })


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <Rejected rejected={k}/>
              </Grid>
              <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <Approved approved={j}/>
              </Grid>
               <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <Pending pending={i}/>
              </Grid>
              <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers total={t}/>
        </Grid>
        
        </Grid>
    </div>
  );
};


export default Dashboard;
