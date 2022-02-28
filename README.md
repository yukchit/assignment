# Assignment - Yield Farm Auto Compounder


### Pre-Requisties to Run the Auto-Compounder
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Access of PancakeSwap](https://pancakeswap.finance/)
- Private Key & Mnemonic of Your Wallet Account
- Some CAKEs & BNBs in Your Wallet Account
- Websocket Address (Optional for Full Demonstration)
- Create a `.env` file (Please have a look at `.env.sample` as an example)


### Installing Dependencies

Run `npm install`

---
## Start the Auto-Compounder (Ver. 1)

Run `node auto-compounder.js`


### Video Demonstration

https://www.dropbox.com/s/c8dnibavhe7i8xs/Auto-Compounder%28Ver%201%29.mov?dl=0

This auto-compounder show the balances of: 
- **CAKE** (Wallet)
- **BNB** (Wallet)
- **CAKE-BNB LP Tokens** (Wallet)
- **Pending Rewards of CAKE** (from the CAKE-BNB Farm)

It also estimate all the gas fees needed for the transactions for each auto-compounding and sum it up:
- Harvesting CAKE
- Swapping half amount of CAKE into BNB
- Adding liquidity of CAKE-BNB by pairing CAKE & BNB
- Re-investing all CAKE-BNB LP Tokens into the farm 

1. It would continuously to auto-compound. 
2. In case there is no liquidity of CAKE-BNB, it would stop re-investing for this particular time.
3. But it would still be triggered to start auto-compounding again by next time interval.
4. For this Auto-Compounder(Ver.1) the time-interval can be simply increased by changing the [time interval](https://github.com/yukchit/assignment/blob/main/auto-compounder.js#L336) to avoid spending too much gas fees for harvesting too frequent.

---
## Start the Auto-Compounder (Ver. 2)

Run `node v2-auto-compounder.js`


### Video Demonstration
https://www.dropbox.com/s/d67ehlm86x7g2yt/Auto-Compounder%28Ver%202%29.mov?dl=0

The advanced features of this Auto-Compounder(Ver.2):
- It compares the values of the **pending CAKE reward** & **total estimated gas fee** that needed for one time of auto-compounding
- When the value of **pending CAKE reward** is less than the value of **total estimated gas fee**, it would **STOP** harvesting and wait for next time interval to start again.

---
## Start the Auto-Compounder (Ver. 3)

Run `node v3-auto-compounder.js`


### Video Demonstration
https://www.dropbox.com/s/c1eq0afoy2f2y68/Auto-Compounder%28Ver%203%29.mov?dl=0

The advanced features of this Auto-Compounder(Ver.3):
- This Auto-Compounder(Ver.3) is connected to **web socket**.
- By using web socket, its listener would waiting for the signal that emitted from a **new created pair**.
- Once a new pair is created, it would trigger this Auto-Compounder(Ver.3).

---
## Reward Calculator    

Run `node reward-calculater.js`

### Description

- This Reward Calculator assumes the yield farming is auto-compounding once a day.
- It assumes the initial investment is $1000.
- It calculates the rewards of both normal staking investment and yield farming with auto-compounding once a day.
- It would exit if user enter non-number or number that is smaller than 1.
