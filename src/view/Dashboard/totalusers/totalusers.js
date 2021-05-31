import React,{useEffect} from 'react';
import clsx from 'clsx';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/EmailRounded';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalUsers = props => {
  const { className,dispatch,total, ...rest } = props;

  const classes = useStyles();

  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL EMAILS
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              
             {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EmailIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};



export default connect()(TotalUsers);
