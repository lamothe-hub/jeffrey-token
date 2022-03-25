const {assert, expect} = require('chai'); 
const JeffreyToken = artifacts.require('./JeffreyToken'); 
require('chai').use(require('chai-as-promised')).should(); 

contract('JeffreyToken', (accounts) => {
    let contract; 

    before(async () => {
        contract = await JeffreyToken.deployed(); 
    }); 

    describe('deployment', async () => {
        it('deploys to valid address successfully', async () => {
            const address = contract.address; 
            assert.notEqual(address, ''); 
            assert.notEqual(address, null); 
            assert.notEqual(address, undefined); 
            assert.notEqual(address, 0x0); 
        }); 
    }); 

    describe('metadata', async () => {
        it('has correct name() function', async () => {
            const name = await contract.name(); 
            assert.equal(name, "JeffreyToken"); 
        }); 

        it('has correct symbol() function', async () => {
            const name = await contract.symbol(); 
            assert.equal(name, "JEFF"); 
        }); 
    }); 

    describe('getter methods', async => {
        it('gets totalSupply', async () => {
            const totalSupply = await contract.totalSupply(); 
            assert.equal(totalSupply, 0); 
        }); 

        it('gets balanceOf address', async () => {
            const balanceOf = await contract.balanceOf(accounts[0]); 
            assert.equal(balanceOf, 0); 
        }); 
    })

    describe('minting', async () => {
        it('mints proper amount to sender address', async () => {
            await contract.mintToSender(100);  
            assert.equal(await contract.balanceOf(accounts[0]), 100); 
        }); 

        it('updates totalSupply when minting', async () => {
            const priorTotalSupply = await contract.totalSupply(); 
            await contract.mintToSender(100);  
            assert.equal(await contract.totalSupply() - priorTotalSupply, 100); 
        }); 
    })

    describe('transfers', async () => {
        it('should fail if sender has inadequate funds', async () => {
            const currSenderBalance = accounts[0]; 
            //const result = await contract.transfer(accounts[1], currSenderBalance + 1); 
            await contract.transfer(accounts[1], currSenderBalance + 1).should.be.rejected;
        }); 

        it('should send funds if valid request', async () => {
            // ensure sender has some valid funds so something happens : 
            await contract.mintToSender(100); 

            // 1 : validate that the sender has more than 1 eth : 
            const originalSenderBalance = await contract.balanceOf(accounts[0]); 
            const originalRecipientBalance = await contract.balanceOf(accounts[1]); 

            // 2 : send that amount of money to the recipient : 
            await contract.transfer(accounts[1], originalSenderBalance);

            // 3 : print the new recipient balance : 
            const newRecipientBalance = await contract.balanceOf(accounts[1]); 

            // 4 : print the new sender balance : 
            const newSenderBalance = await contract.balanceOf(accounts[0]); 

            assert.equal(newRecipientBalance - originalRecipientBalance, originalSenderBalance); 
        });
    });

    function extractBalance(balance) {
        return balance.words[0]; 
    }
});