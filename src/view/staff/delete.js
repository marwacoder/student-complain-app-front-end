import React, {Component} from 'react';
import {
    Button, DeleteForever,Dialog, Typography
} from '../../mui'
import { connect } from 'react-redux'
import Snackbars from '../../helpers/components/snackbar'

import { deleteEmail, deleteEmailRefresh } from '../../store/actions'



class DeleteEmail extends Component {
    state={
        open : false,
    }

 handleClickOpen = () => {
    this.setState({
        open : !this.state.open,
    })
  }
  
onHandleSnack = () => {
    this.props.refresh()
  }
  handleDelete = (e) =>{
    const { emailId, onDelete,params } = this.props;
    
    if(e.target){
      this.setState({
        open : false,
      })
    }
      onDelete({role:params.role, lecturerId: params.lecturerId,emailId:emailId})
  }

    render(){
      const { classes, emailId } = this.props;
        const { message, error } = this.props.destroy
        return (
            <div>
                <Button onClick={this.handleClickOpen}><DeleteForever style={{ color: '#19A15F' }} /></Button>
            <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <div style={{ width: 300, padding: 20 }}>
                        <Typography>
                 Are You Sure You Want To Delete This Record ? 
                 </Typography>
                 <Button onClick={this.handleClickOpen} style={{ backgroundColor: '#19A15F', color: '#fff', }}>
                  Cancle
                  </Button>
                  <Button onClick={this.handleDelete} style={{backgroundColor: '#19A15F', color: '#fff', float: 'right'}}>
                        Delete
                  </Button>
                        

                </div>
               
                </Dialog>
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
                    </div> 
                
          );
    }
 
}

const mapStateToProps = (state) => {
  return {
    destroy: state.destroy,
    params: state.isAuthenticated.data[0]
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
      onDelete: (emailId) => dispatch(deleteEmail(emailId)),
      refresh: ()=> dispatch(deleteEmailRefresh())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEmail);