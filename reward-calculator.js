const readline = require("readline");
const figlet = require("figlet");
const gradient = require("gradient-string");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const title = async() => {
    return new Promise((resolve, reject) => {
        try {
            console.clear();
            figlet(`Reward Calculator`, (err, data) => {
                console.log('\n\n'+ gradient.pastel.multiline(data) + '\n');
                resolve();
             })   
        } catch(e) {
            console.error(e);
            reject();
        }
    })
}

const question1 = () => {
  return new Promise((resolve, reject) => {
      try {
        rl.question('\nHi! What is your name? \n', (name) => {
            console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\n\nHi, ${name}\n`);
            resolve();
        })    

      } catch(e) {
          console.error(e);
          reject();
      }
  })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        try {
            console.log('\x1b[93m\x1b[1m%s\x1b[0m', "I'm a calculator for preparing the extra reward between using & without using auto-compounding \nwhen you are investing into the CAKE-BNB farm in PancakeSwap.\n");

            var recursiveAsyncReadLine = function () {
                rl.question("How much money in US dollars is your initial capital?\n", function(initialCapital) {
                    if (isNaN(parseInt(initialCapital)) || parseInt(initialCapital) <= 0) {
                        return rl.close();
                    }
                    rl.question("\nHow many day(s) do you want to be the time interval between each auto-compounding?\n", function(intervalInDays) {
                        if (isNaN(parseInt(intervalInDays)) || parseInt(intervalInDays) <= 0) {
                            return rl.close();
                        }
                        rl.question("\nHow many Day(s) after your first day of investment do you wanna know the comparison?\n", function(daysOfInvestment) {
                            if (isNaN(parseInt(daysOfInvestment)) || parseInt(daysOfInvestment) <= 0) {
                                return rl.close();
                            }
                            let comparisonForAutoCompoundingByEnteredCapitalAndFrequency = (initialCapitalInString, intervalInDaysInString, daysOfInvestment) => {
                                let dayNumber = parseInt(daysOfInvestment);
                                let initialCapital = parseInt(initialCapitalInString);
                                let intervalInDays = parseInt(intervalInDaysInString);
                                let intervalNumber = dayNumber / intervalInDays;
                                let totalGasFeePerCompound = 1.1;
                                let apr = 0.329;
                                console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\n\n\nGiven that your initial investment is US$${initialCapital},\nthe frequency of auto-compounding is once per ${intervalInDays} day(s),\nthe APR of CAKE-BNB farm is ${apr * 100}%, \nand the total gas fee per compounding is US$${totalGasFeePerCompound}\n`);
                                
            
                                let rewardWithoutYieldFarming = (initialCapital * (apr / 365.25) * intervalNumber * intervalInDays) - totalGasFeePerCompound;
        
                                // The equation:
                                // let x be Initial Capital,
                                // let f be the Total Gas Fee per one time of Compounding,
                                // let r be the Daily Rate of APR,
                                // let t be the time interval in day between each auto-compounding,
                                // 1st Week Reward = tr(x) - f;
                                // 2nd Week Reward = tr(x + FirstWeekReward) - f;
                                // 3rd Week Reward = tr(x + FirstWeekReward + SecondWeekReward) - f;
                                // 4th Week Reward = tr(x + FirstWeekReward + SecondWeekReward + ThirdWeekReward) -f;
                                // 5th Week Reward = tr(x + FirstWeekReward + SecondWeekReward + ThirdWeekReward + FourthWeekReward) - f;
                                // ...
        
                                let rewardWithYieldFarming = 0;
                                for (let i=1; i<=Math.floor(intervalNumber); i++) {
                                    rewardWithYieldFarming += intervalInDays * (apr / 365.25) * (initialCapital + rewardWithYieldFarming) - totalGasFeePerCompound;
                                }
        
                                console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${dayNumber} Day(s) after initial investment: \n`);
                                console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${rewardWithoutYieldFarming} USD`);
                                console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with Auto-Compounding = ${rewardWithYieldFarming} USD\n`);
                                console.log('\x1b[96m%s\x1b[0m', `EXTRA REWARD by Auto-Compounding = ${rewardWithYieldFarming - rewardWithoutYieldFarming} USD\n\n`);
                            }
                            comparisonForAutoCompoundingByEnteredCapitalAndFrequency(initialCapital, intervalInDays, daysOfInvestment);
                            
                            recursiveAsyncReadLine();
                        })
                    })
                })

              };
              recursiveAsyncReadLine();

        } catch(e) {
            console.error(e);
            reject();
        }
    })
  }

const main = async () => {
    try {
        await title();
        await question1();
        await question2();
        rl.close();

    } catch(e) {
        console.error(e);
    }
}

main();