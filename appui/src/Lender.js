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
import img1 from './images/profile1.png';
import img2 from './images/profile2.png';
import img3 from './images/profile3.png';
import img4 from './images/profile4.png';
import img5 from './images/profile5.png';
import img6 from './images/profile6.png';

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
        var recipient = ethnode.accounts[1];
        console.log(recipient);
        var orig = ethnode.accounts[0];
        var amount = 1000;
        alphacontract.send.sendTransaction(recipient, amount, { from: orig, to: recipient}, function (error, result) {
            var val = result;
            console.log(val);
        }.bind(this));
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
                    <p className="App-intro">
                        Find borrowers and submit a Lending request !
            </p>
                </div>
                <div style={style}>
                    <p className="App-intro">
                        Get balance from your wallet!
    </p>
                    <div>
                        {
                            this.state.visible
                                ? <div><h3>Your balance is {this.state.value} INR</h3></div>
                                : null
                        }
                    </div>

                    <button onClick={this.getBalance} style={style}>Get Balance</button> <br />
                    <div style={style}>
                        <img src={img1} />
                        <p className="legend">Amount Requested - 1000 INR</p>
                        <p className="legend">Loan Duration - 1 Week</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle} onClick={this.handleOpenModal}>
                            User 1
    </Button>
                        <ReactModal style={modalStyle}
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                        >
                            <h2 className="App-intro">
                                Extend Loan Request of 1000 INR to User 1
            </h2> <br />
                            <Button bsStyle="primary" bsSize="large" style={buttonStyle} onClick={this.handleCloseModal}>Send Request</Button>
                        </ReactModal>
                    </div>
                    <div style={style}>
                        <img src={img2} />
                        <p className="legend">Amount Requested - 50000 INR</p>
                        <p className="legend">Loan Duration - 6 Months</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle}>
                            User 2
    </Button>
                    </div>
                    <div style={style}>
                        <img src={img3} />
                        <p className="legend">Amount Requested - 50000 INR</p>
                        <p className="legend">Loan Duration - 6 Months</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle}>
                            User 3
    </Button>
                    </div>
                    <div style={style}>
                        <img src={img4} />
                        <p className="legend">Amount Requested - 50000 INR</p>
                        <p className="legend">Loan Duration - 6 Months</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle}>
                            User 4
    </Button>
                    </div>
                    <div style={style}>
                        <img src={img5} />
                        <p className="legend">Amount Requested - 50000 INR</p>
                        <p className="legend">Loan Duration - 6 Months</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle}>
                            User 5
    </Button>
                    </div>
                    <div style={style}>
                        <img src={img6} />
                        <p className="legend">Amount Requested - 50000 INR</p>
                        <p className="legend">Loan Duration - 6 Months</p>
                        <Button bsStyle="primary" bsSize="large" style={buttonStyle}>
                            User 6
    </Button>
                    </div>
                </div>
            </div>

        )
    }
};
