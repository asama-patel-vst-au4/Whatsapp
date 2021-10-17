import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat'
import Login from './components/Login';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user } , dispatch] = useStateValue('')


  return (

    //BEM naming conventions
    <div className="app">
      {!user ? <Login /> :
      <div className="app__body">
      <Router>
      <Sidebar />
        <Switch>
      <Route path='/rooms/:roomId'>
      <Chat />
      </Route>
      <Route path='/chat'>
      <Chat />
      </Route>
      </Switch>
      </Router>
    </div>}
     
    </div>
  );
}

export default App;
