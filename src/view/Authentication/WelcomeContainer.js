import React, {Component} from 'react';
import {connect} from 'react-redux'
import AuthContainer from '../Authentication/AuthContainer'
import Snackbars from '../../helpers/components/snackbar'
import {authRefresh} from '../../store/actions'
 
class WelcomeContainer extends Component {
    

    onHandleSnack = () => {
        this.props.refresh()
    }
    render() {
        const {error, message } = this.props.authState
    
    

    
        return (
            <div className="welcome">
                <AuthContainer />
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
      authState: state.isAuthenticated
  }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        
        refresh:()=>dispatch(authRefresh()),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(WelcomeContainer);