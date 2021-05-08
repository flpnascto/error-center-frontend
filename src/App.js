import React from 'react';
import Provider from './context/Provider'
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
// import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;