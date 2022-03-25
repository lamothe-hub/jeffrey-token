// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; 

contract JeffreyToken is IERC20 {
    string private _name; 
    string private _symbol; 
    uint256 private _totalSupply; 
    mapping(address => uint256) private _balanceByAddress; 
    mapping(address => mapping(address => uint256)) private _allowances; 

    constructor(string memory name_, string memory symbol_) {
        _name = name_; 
        _symbol = symbol_; 
        _totalSupply = 0; 
    }

    function name() external view returns (string memory) {
        return _name; 
    }

    function symbol() external view returns (string memory) {
        return _symbol; 
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply; 
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return _balanceByAddress[_owner]; 
    }

    function mintToSender(uint _numTokens) public {
        _balanceByAddress[msg.sender] += _numTokens; 
        _totalSupply += _numTokens; 
    }

    function transfer(address _to, uint256 value) public returns (bool) {
        address owner = msg.sender; 
        _transfer(owner, _to, value); 
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: can not transfer from the zero address"); 
        require(to != address(0), "ERC20: can not transfer to the zero address"); 

        uint256 fromBalance = _balanceByAddress[from]; 
        require(fromBalance >= amount, "ERC20: insufficient funds to complete transfer"); 
        unchecked {
            _balanceByAddress[from] = fromBalance - amount; 
        }
        _balanceByAddress[to] += amount; 

        emit Transfer(from, to, amount); 
        
    }
    
    function approve(address spender, uint256 amount) public override returns(bool) {
        address owner = msg.sender; 
        _approve(owner, spender, amount); 
        return true; 
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20 : can not approve from the zero address"); 
        require(spender != address(0), "ERC20 : can not add approval to the zero address"); 

        _allowances[owner][spender] = amount; 
        emit Approval(owner, spender, amount); 
    }

    function allowance(address owner, address spender) public view returns(uint256) {
        return _allowances[owner][spender]; 
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        address spender = msg.sender; 
        _spendAllowance(from, spender, amount); 
        _transfer(from, to, amount); 
        return true; 
    }

    function _spendAllowance(address owner, address spender, uint256 amount) internal {
        uint256 currentAllowance = allowance(owner, spender); 
        if(currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance to spend"); 
            unchecked {
                _approve(owner, spender, currentAllowance - amount); 
            }
        }
    }


}