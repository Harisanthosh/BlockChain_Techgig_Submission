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


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            transactions: false,
            txArray: [],
            txFrom: '',
            txTo: '',
            txAmount: '',
            value: ''
        };


        this.getBalance = this.getBalance.bind(this);
        this.getBalanceIm = this.getBalanceIm.bind(this);
        this.repayDebt = this.repayDebt.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
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
        bal = 1000;
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
    getTransactions() {
        let loanSent = alphacontract.Sent({}, { fromBlock: 0, toBlock: 'latest' })
        loanSent.get((error, logs) => {
            // we have the logs, now print them
            logs.forEach((log, index) => {
                console.log(log.args);
                var amt = log.args.amount.c;
                // var amount = this.state.txAmount.slice();
                // amount[index] = amt;
                var tranArray = this.state.txArray.slice();
                tranArray[index] = log.args;
                this.setState({txAmount : amt});
                this.setState({ txArray: tranArray });
                console.log(log.args.amount.c);
                var from = log.args.from;
                // var fr = this.state.txFrom.slice();
                // fr[index] = from;
                this.setState({txFrom : from});
                console.log(log.args.from);
                var to = log.args.to;
                // var tr = this.state.txTo.slice();
                // tr[index] = to;
                this.setState({txTo : to});
                console.log(log.args.to);
            })
            this.setState({ transactions: true });
            // this.setState({ txArray: logs });
            //100.116.0.193
        })
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
            fontSize: "20px"

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
                <p className="styleFont">
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
                <Button bsStyle="primary" onClick={this.getTransactions} style={style}>See All Transactions Details!</Button> <br />
                <div>
                    {
                        // this.state.transactions
                        //     ? <div><h3>Your balance is {this.state.value} INR</h3></div>
                        //     : null                        
                        // this.state.transactions
                        //     ? <div><h3>A Transaction of {this.state.txAmount} INR From {this.state.txFrom} To {this.state.txTo} </h3></div>
                        //     : null
                        
                        

                        this.state.transactions
                            ? this.state.txArray.map((log,i) => {
                                return (<div key={i}><h3>A Transaction of {log.amount.c[0]} INR From {log.from} To {log.to} </h3></div>)
                                
                                // <div><h3>A Transaction of {log} INR </h3></div>
                            })
                            : null
                    }
                    {console.log(this.state.txArray)}
                </div>
            </div>
        )
    }
};
