import React, { Component } from 'react';
import logo from './alphaalloy.jpg';
import './App.css';
import { Button } from 'react-bootstrap';
import { alphacontract } from "./Setup";
import { ethnode } from "./Setup";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';


export default class Borrower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: ''
        };


        this.getBalance = this.getBalance.bind(this);
        this.getBalanceIm = this.getBalanceIm.bind(this);
        this.repayDebt = this.repayDebt.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getBalance() {
        console.log(alphacontract.address);
        //var orig = alphacontract.minter.call();
        var recipient = ethnode.accounts[1];
        var bal = "";
        // var val = alphacontract.getBalance("0x202e1d3139b35a500767551bf03d4f52b3d150af");
        alphacontract.getBalance(recipient, function (error, result) {
            var val = result;
            console.log(val);
            bal = val.c[0];
            console.log(bal);
            this.setState({ visible: true, value: bal });
        }.bind(this));
    }

    getBalanceIm() {
        //var orig = alphacontract.minter.call();
        var recipient = ethnode.accounts[1];
        //var recipient = "0xe4e3dfbeb271400c9d6c7a08783d358397d36c9f";
        var val = alphacontract.balances.call(recipient);
        console.log(val);
        var bal = val.c[0];
        console.log(bal);
        // bal = 1000;
        this.setState({ visible: true, value: bal });
        // alphacontract.balances.call(recipient, function (error, result) {
        //     var val = result;
        //     console.log(val);
        //     bal = val.c[0];
        //     console.log(bal);
        //     this.setState({ visible: true, value: bal });
        // }.bind(this));
    }

    repayDebt() {
        var recipient = "0xe4e3dfbeb271400c9d6c7a08783d358397d36c9f";
        console.log(recipient);
        var orig = alphacontract.minter.call();
        var amount = 1000;
        alphacontract.send.sendTransaction(orig, amount, { from: recipient }, function (error, result) {
            var val = result;
            console.log(val);
        }.bind(this));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        const style = {
            align: "center",
            padding: "12px 20px",
            margin: "8px",
            boxSizing: "border-box",
            fontFamily: 'Montserrat',
            fontSize: '20px'
        }
        const buttonStyle = {
            align: "center",
            padding: "12px 20px",
            margin: "8px",
            color: "purple",
            margin: "20px"
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo-static" alt="logo" />
                    <h1 className="App-title">Welcome to AlloyChain</h1>
                </header>
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

                <button onClick={this.getBalanceIm} style={style}>Get Balance</button> <br />
                <Button bsStyle="primary" onClick={this.repayDebt} style={style}>Repay Previous Debt</Button> <br />
                <p className="App-intro">
                    Submit your Proposal for Loan!
    </p>

                <form onSubmit={this.handleSubmit}>
                    <label style={style}>
                        Amount Needed
          <input style={style} type="text" value={this.state.value} onChange={this.handleChange} />
                    </label> <br />
                    <label style={style}>Proposal
          <textarea style={style} value={this.state.value} onChange={this.handleChange} />
                    </label>.<br />
                    <label>
                        Select Time Period of Loan
          <select style={style} value={this.state.value} onChange={this.handleChange}>
                            <option value="1 week">1 Week</option>
                            <option value="1 Month">1 Month</option>
                            <option value="3 Months">3 Months</option>
                            <option value="Half Year">Half Year</option>
                            <option value="1 Year">1 Year</option>
                        </select>
                    </label>.<br />
                    <label >
                        Expected Interest Rate
          <input style={style}
                            name="interestRate"
                            type="number"
                            value={this.state.interestRate}
                            onChange={this.handleInputChange} />
                    </label>.<br />
                    <input style={buttonStyle} type="submit" value="Submit" />
                </form>
            </div>
        )
    }
};
