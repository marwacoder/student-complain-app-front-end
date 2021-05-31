
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import Spinner from './helpers/components/Spinner/Spinner';
import store from './routes/store';
import { persistStore } from 'redux-persist';
import axios from 'axios'
let spinner = <Spinner/>
const persistor = persistStore(store)
const app = document.getElementById('root');
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const token = sessionStorage.getItem('user-token')

if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}else{
  delete axios.defaults.headers.common['Authorization'];
}
axios.interceptors.request.use(request => {
  console.log(request)
  return request;
}, error => {
  console.log(error)
 return Promise.reject(error)
})

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={spinner} persistor={persistor}>
      <App/>
    </PersistGate>
    </Provider>,
    app,
  );
  
