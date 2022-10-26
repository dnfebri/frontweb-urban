import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import axios from "axios";
import Cookies from 'js-cookie';

import './css/style.css';
import Router from './router';

// axios.defaults.withCredentials = true;
// axios.defaults.credentials = 'include';
// axios.defaults.headers.token = Cookies.get('token')

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router/>
      </Provider>
    </BrowserRouter>
  )
  
}

export default App;
