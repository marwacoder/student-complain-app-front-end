/** @format */

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { IndexStyles } from "../../styles/styles";
import { getHistory } from "../../store/actions";
import Spinner from "../../helpers/components/Spinner/Spinner";
import { deleteEmailRefresh } from "../../store/actions";
import DeleteEmail from "./delete";

class History extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        useNextVariants: true,
        MUIDataTableBodyCell: {
          root: {
            padding: "-1px 56px 4px 24px",
          },
        },
        MuiTableCell: {
          root: {
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 15,
            paddingRight: 4,
            "&:first-child": {
              paddingRight: 0,
              paddingLeft: 13,
              width: "2%",
            },
            "&:second-child": {
              paddingRight: 0,
              paddingLeft: -30,
              width: "0%",
            },
            "&:last-child": {
              paddingRight: 0,
              paddingLeft: 0,
              width: "4%",
            },
          },
        },
        // MUIDataTable: {
        //   responsiveScroll: {
        //     maxHeight: 'none',
        //   },
        // },
        MUIDataTableHeadCell: {
          root: {
            fontWeight: "bold",
            "&:nth-child(1)": {
              width: 1,
            },
            "&:nth-child(2)": {
              width: 150,
            },
            "&:nth-child(3)": {
              width: 200,
            },
            "&:nth-child(4)": {
              width: 150,
            },
            "&:nth-child(5)": {
              width: 250,
            },
            "&:nth-child(8)": {
              width: 100,
            },
          },
        },

        MUIDataTableToolbar: {
          root: {
            marginRight: 10,
          },
          titleText: {
            color: "#19A15F",
          },
          icon: {
            color: "#19A15F",
            "&:hover": {
              backgroundColor: "white",
              color: "#19A15F",
            },
          },
          iconActive: {
            color: "white",
          },
        },
      },
    });

  onHandleSnack = () => {
    this.props.refresh();
  };
  onHandleClick = (id) => {
    this.props.onDelete(id);
  };
  componentDidMount() {
    const { params } = this.props;
    this.props.onHistory(params.role, params.lecturerId);
  }
  render() {
    const { data, isLoading } = this.props.data;
    const { classes } = this.props;
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
        name: "complainType",
        label: "Complain Type",
      },
      {
        name: "message",
        label: "Complain",
      },
      {
        name: "status",
        label: "Status",
      },
      {
        name: "date",
        label: "Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "",
        label: "",
      },
    ];

    const options = {
      rowsPerPageOptions: [5, 10],
      // responsive: "stacked",
      serverSide: false,
      search: true,
      pagination: true,
      rowHover: true,
      selectableRows: "none",
      elevation: 1,
      download: false,
      print: false,
      viewColumns: false,
      filter: false,
      sort: false,
      textLabels: {
        body: {
          noMatch: "no records found",
        },
        selectedRows: {
          text: "rows selected",
        },
      },
    };

    let i = 0;
    const datum =
      data &&
      typeof data !== "undefined" &&
      Array.isArray(data) &&
      data.map((row, i) => {
        return {
          id: (i = i + 1),
          regNo: row.student["studentId"],
          name: row.student["name"],
          complainType: row["complainType"],
          message: row["message"],
          status: row["status"],
          date: row["date"],
          "": <DeleteEmail emailId={row["emailId"]} />,
        };
      });

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={9} xs={12}></Grid>
          {!isLoading ? (
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"Students Complain History"}
                data={datum}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          ) : (
            <Spinner></Spinner>
          )}
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHistory: (role, lecturerId) => dispatch(getHistory(role, lecturerId)),
    refresh: () => dispatch(deleteEmailRefresh()),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.fetch,
    params: state.isAuthenticated.data[0],
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(IndexStyles, { withTheme: true })(History));
