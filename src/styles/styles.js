
export const IndexxxStyles = theme => ({
  root: {
   display: 'flex',
   marginTop: 5,
   marginLeft: '17%',
   marginRight: '17%',
   flexDirection: 'column'
  },
});
export const IndexStyles = theme => ({
  root: {
   display: 'flex',
   paddingTop: 20,
   marginLeft: '0%',
   marginRight: '0%',
   flexDirection: 'column'
  }
  
});
export const IndexxStyles = theme => ({
  root: {
   display: 'flex',
   paddingTop: 5,
   marginLeft: '10%',
   marginRight: '10%',
   flexDirection: 'column'
  },
});


export const ActionsStyles = theme =>({

  formWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 50,
      paddingRight: 50,
  },
  modclose: {
  color: 'white', 
  '&:hover': {
    color: 'red'
  }
  
  },
  addButton: { 
    backgroundColor: '#19A15F',
    float: 'right',
    marginTop: 5,
    marginRight: -30,
    position: 'relative',
    '&:hover': {
      backgroundColor: "white",
      color: '#19A15F',
    }
    
  } ,
  
  button: {
    float: 'right',
    position: 'relative',
    margin: 4,
    backgroundColor: '#19A15F',
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: "white",
      color: '#19A15F',
    }
  },
  header:{
      color: '#19A15F',
      
       marginLeft: 20,
       marginTop: -30,
       marginBottom: 10,
      textTransform: 'capitalize',
      fontSize: 18
  },
  IconButtons:{
    width: 50,
    // height: 35,
      marginLeft: 360,
      color: '#19A15F',
      '&:hover': {
         backgroundColor: "#19A15F",
          color: 'white',
      },
      borderRadius: 300
  },
  closeIcon:{
      color: 'red',
      fontSize: 24,
    //   '&:hover': {
    //     color: 'white',
    // },
  },
  fieldWrappers:{
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  Fields:{
    width: 180,
  },
  Fields1:{
    width: 180,
    marginLeft: 10
  },
  fieldSizes:{
    height: 37,
    // padding: 20
  },
  textFields:{
      width: 370,
  },
  currentDesig:{
    fontSize: 13,
    marginLeft: 5,
    color: '#19A15F',
  },
  menuEmails:{
    fontSize: 12,
    display: 'block',
    color: '#19A15F',
    paddingTop: 0,
  },
  submitButton:{
      marginBottom: 30,
      marginTop: 10,
      height: 45,
      width: 370,
      fontSize: 16,
      backgroundColor: '#19A15F',
      color: 'white',
      // '&:hover': {
      //     backgroundColor: "white",
      //     color: '#19A15F',
      // }
  },
  submitButton1:{
      marginBottom: 30,
      marginTop: 10,
     marginLeft: 100,
     marginRight: -130,

      height: 45,
      width: 140,
      fontSize: 16,
      backgroundColor: '#19A15F',
      color: 'white',
      // '&:hover': {
      //     backgroundColor: "white",
      //     color: '#19A15F',
      // }
  },
  sendIcons:{
    marginLeft: 10,
  },

  actionButton: {
      width: 150,
      height: 50,
    //   margin: 4,
      textAlign: 'left',
      backgroundColor: "inherit",
      color: '#19A15F',
      boxShadow: 'none',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#19A15F',
        color: 'white',
      }
    },
    editHeader:{
      color: '#19A15F',
      marginRight: 150,
      textTransform: 'capitalize',
      fontSize: 14
    }
});

export const Deletestyles = theme => ({
  root:{
      width: 380,
  },
  formWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
  },
  headerWrapper:{
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#19A15F',
    width: 380,
    height: 45,
    marginBottom: 15
  },
  delete:{
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  closeIcon:{
    marginLeft: 180,
    color: 'white',
    fontSize: 24

  },
  button: {
    // margin: theme.spacing(1),
    width: 142,
    height: 50,
    position: 'relative',
    margin: 4,
    backgroundColor: "inherit",
    color: '#19A15F',
    boxShadow: 'none',
    textTransform: 'capitalize',
    
  },
  delIcon:{
      fontSize: 36,
      color: '#de0a0a',
  },
  header:{
      marginTop: 15,
      marginBottom: 15,
      fontSize: 16
  },
  deleteButtonBox:{
    marginTop: 15,
    width: 360,
  },
  cancelButton:{
    marginLeft: 150,
    marginBottom: 15,
    width: 100,
    backgroundColor: '#19A15F',
    borderRadius: 2,
  },
  submitButton:{
    marginLeft: 10,
      marginBottom: 15,
      width: 100,
      borderRadius: 2,
      backgroundColor: '#de0a0a',
      color: 'white',
      '&:hover': {
          backgroundColor: "#de0a0d",
          color: 'white',
      }
  }
});

