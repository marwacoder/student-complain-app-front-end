import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { IndexxxStyles } from '../../styles/styles'
import Spinner from '../../helpers/components/Spinner/Spinner'
import Student from './student'
import Snackbars from '../../helpers/components/snackbar'
import { getComment, deleteComment, deleteCommentRefresh} from '../../store/actions'
import { Button, DeleteForever } from '../../mui'
import DeleteComment from './delete'


 
class StudentTable extends Component {




    getMuiTheme = () => createMuiTheme({
      overrides: {
        useNextVariants: true,
        MUIDataTableBodyCell: {
          root: {
            padding:'-1px 56px 4px 24px'
          }
        },
        MuiTableCell: {
          root: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft:15,
            paddingRight:4,
            "&:first-child": {
              paddingRight: 0,
              paddingLeft:13,
              width:"4%",
            },
            "&:last-child": {
              paddingRight: 0,
              paddingLeft:0,
              width:"2%"
            }
          }
        },
        // MUIDataTable: {
        //   responsiveScroll: {
        //     maxHeight: 'none',
        //   },
        // },
          MUIDataTableHeadCell: {
            root: {
              fontWeight: 'bold',
              '&:nth-child(1)': {
                width: 1
              },
              '&:nth-child(2)': {
                width: 250
              },
              '&:nth-child(3)': {
                width: 100
              },
              '&:nth-child(4)': {
                width: 1
              },
              
            }
        }, 
       
        MUIDataTableToolbar: {
          root: {
            marginRight: 10,
          },
          titleText: {
            color:"#19A15F",
            
          },
          icon :{
            color:"white",
            '&:hover': {
              backgroundColor: "white",
              color: '#19A15F'
            }
          },
          iconActive: {
            color:"white",
          },
        },
      }
      
    })
  
  
  componentDidMount() {
   this.props.onComment({id:this.props.id.studentId})
  }

  onHandleSnack = () => {
    this.props.refresh()
  }  

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.props.onDeleteComment()

  }
  
  render() {
    const { data, isLoading } = this.props.data;
    const { message, error } = this.props.destroy
    const { classes, } = this.props;
 
    
    const columns = [
      {
        name: "id",
        label: "S/N",
      },
      
      {
        name: "comment",
        label: "Comment",
      },
      {
        name: "status",
        label: "Status",
      },
      {
        name: "date",
        label: "Date",
      },
      {
        name: "",
        label: "",
      },
       
    ];
        

    const options = {
  
      rowsPerPageOptions: [5, 10],
      responsive: "stacked",
      serverSide: true,
      search: false,
      pagination: true,
      rowHover: true,
      selectableRows: 'none',
      elevation: 1,
      download: false,
      print: false,
      viewColumns: false,
      filter: false,
      sort: true,
      textLabels: {
        body: {
          noMatch: "no records found",
        },
        selectedRows: {
          text: "rows selected",
        },
      }, customToolbar: () => {
        return (
          <div style={{ float: 'right', marginTop: 10 }}>
            <Student />
        
          </div>
        
        );
      },
        
    };
      
      
    let i = 0;
      const datum = data && typeof data !== 'undefined' && Array.isArray(data) && (data).map((row, i) => {
      
      return {
        id: i = i + 1,
        comment: row['comment'],
        status: row['status'],
        date: row['date'],
        "": <DeleteComment emailId={row['emailId']} studentId={this.props.id.studentId}/>
        
      } 
      
      }) 
  

        return (
          <div className={classes.root}>
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
     
      { !isLoading  ?
       <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
        title={"Student Complain Status"}
        data={datum}
        columns={columns}
        options={options}
      />
      </MuiThemeProvider>
       : <Spinner />} 
              
            
      </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onComment: (id) => dispatch(getComment(id)),
    onDeleteComment: (emailId) => dispatch(deleteComment(emailId)),
    refresh: ()=> dispatch(deleteCommentRefresh())
    
    
     }
}

const mapStateToProps = (state) => {
  return {
    data: state.fetch,
    destroy: state.destroy,
    id: state.isAuthenticated.data[0],
    // userId: state.isAuthenticated,
    // destroy: state.destroy
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(IndexxxStyles, { withTheme: true })(StudentTable));


