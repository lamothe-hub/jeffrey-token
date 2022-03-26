// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

interface IOwnable {
    function getOwner() external view returns (address); 
    function transferOwnership(address newAddress) external returns(bool); 
}