import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './alphaalloy.jpg';
import './App.css';
import { alphacontract } from "./Setup";
import { ShowMovies } from "./ShowMovies";
import { Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Lender from './Lender'
import Borrower from './Borrower'
import Admin from './Admin'
import DryRun from './DryRun'
import AlloyChain from './AlloyChain'
import Login from './login'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={Login} >

          </Route>
          <Route path="/lender" component={Lender} />
          <Route path="/borrower" component={Borrower} />
          <Route path="/admin" component={Admin} />
          <Route path="/dryrun" component={DryRun} />
          <Route path="/login" component={Login} />
          <Route path="/chain" component={AlloyChain} />
          <Route path="/home-single" component={Login} />
        </div>
      </Router>
    );
  }
}


export default App;


