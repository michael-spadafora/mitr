import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Users from './users'
import Contact from './contact'
import Login from './login';
import Register from './register';
import Verify from './verify';
import Display from './display';
import Post from './post';
import Dashboard from './dashboard';

const routing = (
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/verify" component={Verify} />
        <Route path="/display" component={Display} />
        <Route path="/post" component={Post} />
        <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))