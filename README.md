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

1. It would continuously to auto-compound. 
2. In case there is no liquidity of CAKE-BNB, it would stop re-investing for this particular time.
3. But it would still be triggered to start auto-compound again by next time interval.
4. For this version 1 auto-compounder, can simply increase the time-interval to trigger to avoid spending too much gas fees by getting too less CAKE reward by harvesting.

---
## Start the Auto-Compounder (Ver 2)

Run `node v2-auto-compounder.js`


### Video Demonstration
https://www.dropbox.com/s/d67ehlm86x7g2yt/Auto-Compounder%28Ver%202%29.mov?dl=0

The advanced features for this auto-compounder:
- It compare the value of the **pending CAKE reward** & **total gas fee** that needed for one time of auto-compounding
- When the value of **pending CAKE reward** is less than the value of **total gas fee**, it would stop harvesting and wait for next time interval to start again.

---
