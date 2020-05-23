import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { useDispatch } from 'react-redux';

import { logout } from './features/Auth/AuthSlice';

import Chat from './features/Chat';
import Login from './features/Auth/Login';

import 'bulma/css/bulma.css';

function App() {
  const dispatch = useDispatch();
  return (
    <Router>
      <Route path="/" exact component={() => <Login />} />
      <Route path="/chat" exact component={() =>
        localStorage.getItem("username") ? <Chat /> : <Redirect to="/" />
      } />
      <Route path="/logout" exact component={() => {
        dispatch(logout());
        return <Redirect to="/" />
      }} />
    </Router>
  );
}

export default App;
