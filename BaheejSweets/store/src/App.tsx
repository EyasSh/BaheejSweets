import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import './App.css';
import Orders from './Components/Orders/Orders';

function App() {
  return (
   <div className='App'>
    
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='orders' element={<Orders />}/>
        </Routes>
      </Router>
   </div>
  );
}

export default App;
