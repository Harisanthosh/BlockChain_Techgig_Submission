pragma solidity ^0.4.17;
contract SimpleTransfer {
  uint public storedData;

  function SimpleTransfer(uint initialValue) public {
    storedData = initialValue;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint retVal) {
    return storedData;
  }

}
