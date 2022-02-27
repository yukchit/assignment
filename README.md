# Assignment - Yield Farm Auto Compounder


### Pre-Requisties to Run the Auto-Compounder
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Account of PancakeSwap with some CAKE & BNB](https://pancakeswap.finance/)
- Private Key & Mnemonic of Your Wallet Account
- Websocket Address (Optional for Full Demonstration)
- Create a `.env` file (Please have a look at `.env.sample` as an example)


### Installing Dependencies

Run `npm install`

---
## Start the Auto-Compounder (Ver 1)

Run `node auto-compounder.js`


### Video Demonstration

https://www.dropbox.com/s/c8dnibavhe7i8xs/Auto-Compounder%28Ver%201%29.mov?dl=0

This auto-compounder show the balances of: 
- **CAKE** (Wallet)
- **BNB** (Wallet)
- **CAKE-BNB LP Tokens** (Wallets)
- **Pending Rewards of CAKE** (from the Farm)

It also estimate all the gas fees needed for the transactions for each auto-compounding and sum it up:
- Harvesting CAKE
- Swapping half amount of CAKE into BNB
- Adding liquidity of CAKE-BNB by pairing CAKE & BNB
- Re-investing all CAKE-BNB LP Tokens into the farm 

It would continuously to auto-compound. 
In case there is no liquidity of CAKE-BNB, it would stop re-investing for this particular time.
But it would still be triggered to start auto-compound again by next time interval.

---