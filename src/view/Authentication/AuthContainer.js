import React, { Component } from 'react';

import {Card, ArrowBackIcon, Fab} from '../../mui'
import {connect} from 'react-redux'
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'

import logo from '../../assets/logo.jpg'
import facebook from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import instagram from '../../assets/instagram.png'
import google from '../../assets/google.png'


class AuthContainer extends Component{

   state = {
      page: 1
   }

   handleTabHandler = () => {
      this.setState(prevState => ({toggle: !prevState.toggle}))
   }

   handlePage = (page) => {
      this.setState({page: page})
   }
   render() {
      return (
         
         <Card className="welcome-container">
           
               <div className="Logo">
               <img src={logo} alt="Logo" className="logo" />
               
            </div>
            {this.state.page === 2 ? <div>
            
               <Fab color='primary' 
            onClick={() => this.handlePage(1)} 
            size="small" aria-label="add"
             style={{marginLeft: -150, marginTop: 10, position:'absolute', backgroundColor: '#19A15F'}}
            >
            <ArrowBackIcon />
                </Fab>
            </div> : null}
            
            <div className="tabs">
               {this.state.page === 1 ?
                  <div>
                     <div onClick={() => this.handlePage(1)} className={this.state.page === 1 && "sign-in "}>SIGN IN</div>

                  </div>
                  : this.state.page === 2 ?
                     <div>
                        <div onClick={() => this.handlePage(2)} className={this.state.page === 2 && "sign-in"}>RESET PASSWORD</div>

                     </div>
                     
                     
                     : null}
            </div>
               
            {this.state.page === 1 && <SignIn handlePage={this.handlePage}/>} 
            
            {this.state.page === 2 && <ForgotPassword /> }
            
           
               <div className="social-media">
                  <div><img src={google} alt="Google" className="social-media-google" /></div>
                  <div><img src={facebook} alt="Facebook" className="social-media-facebook" /></div>
                  <div><img src={twitter} alt="Twitter" className="social-media-twitter" /></div>
                  <div><img src={instagram} alt="Instagram" className="social-media-instagram" /></div>
               </div>
            </Card>
          
         
           
      );
   }
}
 

export default connect()(AuthContainer);