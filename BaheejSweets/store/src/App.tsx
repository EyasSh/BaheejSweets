import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import './App.css';

function App() {
  return (
   <div className='App'>
    <Nav/>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
   </div>
  );
}

export default App;
