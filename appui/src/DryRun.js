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
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
        for (var i = 0; i < 8; i++) {
            var recipient = ethnode.accounts[i+1];
            console.log(recipient);
            var orig = ethnode.accounts[i];
            var amount = 1000 - (i * 10);
            alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
                var val = result;
                console.log(val);
            }.bind(this));
        }
        for (var i = 0; i < 8; i++) {
            var recipient = ethnode.accounts[i+1];
            console.log(recipient);
            var orig = ethnode.accounts[0];
            var amount = 1000;
            alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
                var val = result;
                console.log(val);
            }.bind(this));
        }
        for (var i = 5; i > 1; i--) {
            var recipient = ethnode.accounts[i];
            console.log(recipient);
            var orig = ethnode.accounts[i-1];
            var amount = 50 + (i * 10);
            alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
                var val = result;
                console.log(val);
            }.bind(this));
        }
        for (var i = 0; i < 8; i++) {
            var recipient = ethnode.accounts[i+1];
            console.log(recipient);
            var orig = ethnode.accounts[i];
            var amount = 750 - (i * 10);
            alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
                var val = result;
                console.log(val);
            }.bind(this));
        }
        // var recipient = ethnode.accounts[1];
        // console.log(recipient);
        // var orig = ethnode.accounts[0];
        // var amount = 1000;
        // alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient = ethnode.accounts[1];
        // console.log(recipient);
        // var orig = ethnode.accounts[0];
        // var amount = 4000;
        // alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient2 = ethnode.accounts[2];
        // console.log(recipient2);
        // var orig2 = ethnode.accounts[1];
        // var amount = 2000;
        // alphacontract.send.sendTransaction(recipient2, amount, { from: orig2, to: recipient2}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient3 = ethnode.accounts[2];
        // console.log(recipient3);
        // var orig3 = ethnode.accounts[0];
        // var amount = 3000;
        // alphacontract.send.sendTransaction(recipient3, amount, { from: orig3, to: recipient3}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient4 = ethnode.accounts[1];
        // console.log(recipient);
        // var orig4 = ethnode.accounts[2];
        // var amount = 2000;
        // alphacontract.send.sendTransaction(recipient4, amount, { from: orig4, to: recipient4}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient5 = ethnode.accounts[3];
        // console.log(recipient);
        // var orig5 = ethnode.accounts[0];
        // var amount = 1000;
        // alphacontract.send.sendTransaction(recipient5, amount, { from: orig5, to: recipient5}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient6 = ethnode.accounts[4];
        // console.log(recipient);
        // var orig6 = ethnode.accounts[1];
        // var amount = 3000;
        // alphacontract.send.sendTransaction(recipient5, amount, { from: orig6, to: recipient6}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient7 = ethnode.accounts[5];
        // console.log(recipient);
        // var orig7 = ethnode.accounts[1];
        // var amount = 1000;
        // alphacontract.send.sendTransaction(recipient5, amount, { from: orig7, to: recipient7}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient8 = ethnode.accounts[2];
        // console.log(recipient);
        // var orig8 = ethnode.accounts[0];
        // var amount = 1000;
        // alphacontract.send.sendTransaction(recipient5, amount, { from: orig8, to: recipient8}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
        // var recipient9 = ethnode.accounts[6];
        // console.log(recipient);
        // var orig9 = ethnode.accounts[2];
        // var amount = 2000;
        // alphacontract.send.sendTransaction(recipient5, amount, { from: orig9, to: recipient9}, function (error, result) {
        //     var val = result;
        //     console.log(val);
        // }.bind(this));
    }

    render() {
        var style = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            margin: '50',
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
                    </div> <br />
                    <div style={style}>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle} onClick={this.handleCloseModal}>
                            Handle Dry Run
    </Button>
                    </div>
                </div>
            </div>

        )
    }
};
