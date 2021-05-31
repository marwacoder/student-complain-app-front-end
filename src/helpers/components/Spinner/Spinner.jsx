import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

class Spinner extends Component {
   

   render() {
      return (
         <div className='loader'>
            <Loader
               type="Puff"
               className="primary"
               height={60}
               width={60}
            />
         </div>
      )
   }
}



export default Spinner
