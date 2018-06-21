import React, { Component } from 'react';
import logo from './alphaalloy.jpg';
import './App.css';
import { Button } from 'react-bootstrap';
import { alphacontract } from "./Setup";
import { ethnode } from "./Setup";
import ReactModal from 'react-modal';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

export default class Lender extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            visible: false,
            value: ''
        };
        this.getBalance = this.getBalance.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getBalance() {
        console.log(alphacontract.address);
        var orig = alphacontract.minter.call();
        //var recipient = "0xe4e3dfbeb271400c9d6c7a08783d358397d36c9f";
        var bal = "";
        // var val = alphacontract.getBalance("0x202e1d3139b35a500767551bf03d4f52b3d150af");
        alphacontract.getBalance(orig, function (error, result) {
            var val = result;
            console.log(val);
            bal = val.c[0];
            console.log(bal);
            this.setState({ visible: true, value: bal });
        }.bind(this));
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    render() {
        var style = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            margin: '50',
            fontSize: "20px",
            padding: "10px"
            //textAlign: "center"
        }
        var buttonStyle = {
            display: "block",
            width: "65%",
            margin: "auto",
        }
        var modalStyle = {
            margin: "auto",
            width: "50%",
            height: "50%",
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid rgb(204, 204, 204)",
            background: "rgb(255, 255, 255)",
            overflow: "auto",
            borderRadius: "4px",
            outline: "none",
            padding: "20px"
        }
        return (
            <div className="App">
                <div>
                    <header className="App-header">
                        <img src={logo} className="App-logo-static" alt="logo" />
                        <h1 className="App-title">Welcome to AlloyChain</h1>
                    </header>
                </div>
                <div style={style}>
                    <div>
                        {
                            this.state.visible
                                ? <div><h3>Your balance is {this.state.value} INR</h3></div>
                                : null
                        }
                    </div> <br /> <br />
                    <div style={style}>
                        <label style={style}>
                            Enter your wallet Address
          <input style={style} type="text" value={this.state.value} onChange={(event) => this.handleChange(event)} />
                        </label> <br />
                        <h3 style={style}> The entered address is {this.state.value}  </h3>
                    </div>
                </div><br />
                <Button bsSize="large" style={buttonStyle} onClick={this.handleCloseModal}>
                   
                   <Link to={'/chain/'+this.state.value}> Log In </Link>
    </Button>
            </div>

        )
    }
};
