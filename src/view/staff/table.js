import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import Spinner from '../../helpers/components/Spinner/Spinner'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { IndexxStyles } from '../../styles/styles'
import Staff from './staff'

import {getStudentMails} from '../../store/actions'


class StaffTable extends Component {




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
              width:"2%",
                },
            "&:second-child": {
              paddingRight: 0,
              paddingLeft:-30,
              width:"0%",
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
                width: 100
              },
              '&:nth-child(3)': {
                width: 150
              },
              '&:nth-child(4)': {
                width: 200
              },
              '&:nth-child(5)': {
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
    const { params } = this.props
    this.props.onComplain(params.role, params.lecturerId)
  
  }
  
  render() { 
    
    const { data, isLoading, params } = this.props.data;
    const {classes} = this.props
        const columns = [
      {
      name: "id",
      label: "S/N",
    },
      
      {
       name: "regNo",
       label: "Student RegNo",
      },
      {
        name: "name",
        label: "Name",
          },
      {
        name: "message",
        label: "Complain",
            },
       {
        name: "date",
        label: "Date",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "",
        label: "",
       },
        ];
        

        const options = {
  
      rowsPerPageOptions: [5,10],
      responsive: "stacked",
      fixedHeader: true,
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
    },
        
          onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    this.changePage(tableState.page);
                    break;
                case 'changeRowsPerPage':
                    this.onChangeRowsPerPage(tableState.rowsPerPage)
                    break;

            }
        }
        };
       
        let i=0;
    const datum = data && typeof data !== 'undefined' && Array.isArray(data) && (data).map((row, i) => {
      return {
        id: i = i + 1,
        regNo: row.student.studentId,
        name: row.student['name'],
        message: row['message'],
        date: row['date'],
          "": <div style={{ marginLeft: -10 }}> <Staff
            studentId={row.student.studentId}
            //courseTitle={row.course.courseTitle}
          emailId={row['emailId']}
          complainType={row['complainType']}
            message={row['message']}
            email={row.student.email}
        /></div>
      }
    });

        return (
            <div className={classes.root}>
                
      <div>
              {!isLoading ?
                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    title={"Students Complaints"}
                    data={datum}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
                : <Spinner />}
      </div>
               
            
      
      </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onComplain: (role, lecturerId) => dispatch(getStudentMails(role, lecturerId)),
    
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.mail,
    params: state.isAuthenticated.data[0]
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(IndexxStyles, { withTheme: true })(StaffTable));


