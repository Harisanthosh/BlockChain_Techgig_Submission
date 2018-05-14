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
import AlloyChain from './AlloyChain'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={AlloyChain} >

          </Route>
          <Route path="/lender" component={Lender} />
          <Route path="/borrower" component={Borrower} />
          <Route path="/home-single" component={AlloyChain} />
        </div>
      </Router>
    );
  }
}


export default App;


