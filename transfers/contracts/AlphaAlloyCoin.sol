//AlphAlloy contract
pragma solidity ^0.4.21;
contract AlphaAlloyCoin {
address public minter;
uint public aadharNumber;
struct Loan {
    uint amt;
    uint interest;
    uint timeperiod;
    //string proposal;
}
Loan[] loans;
mapping (address => uint) public balances;
event Sent(address from, address to, uint amount);
constructor (uint amount) public {
minter = msg.sender;
balances[msg.sender] = amount;
}
function aadharAuthentication(uint aadharId) returns (bool success) {
    // if(consumeAadharApi.validate(aadharId) == true) {
    if(aadharId != aadharNumber) {
        return true;
    }
    return false;
}
function getBalance(address receiver) returns (uint amount) {
    return balances[receiver];
}
function mint(address receiver, uint amount) public {
if (msg.sender != minter) return;
balances[receiver] += amount;
}
function send(address receiver, uint amount) public {
if (balances[msg.sender] < amount) return;
balances[msg.sender] -= amount;
balances[receiver] += amount;
emit Sent(msg.sender, receiver, amount);
}
}