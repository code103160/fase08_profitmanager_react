import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserBox from './User';
import Home from'./Components/Home';
import GainBox from './Gains';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={<UserBox/>}/>
        <Route path='/sign_in' element={<Login/>}/>
        <Route path='/gains' element={<GainBox/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
