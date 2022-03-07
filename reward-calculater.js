const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
      try {
        rl.question('What is your name? \n', (name) => {
            console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\n\n\nHi, ${name}\n`);
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
            console.log('\x1b[93m\x1b[1m%s\x1b[0m', "I'm a calculator for preparing the extra reward between using & without yield farming \nwhen you are investing into the CAKE-BNB farm in PancakeSwap.\n");

            var recursiveAsyncReadLine = function () {
                rl.question("How many Day(s) after your first day of investment do you wanna know the comparison?\n", function (number) {
                    if (isNaN(parseInt(number)) || parseInt(number) <= 0) {
                        return rl.close();
                    }
    
                    let comparisonForAutoCompoundingEverydayWithoutTakingAccountOfGasFee = (number) => {
                        let dayNumber = parseInt(number);
                        let initialCapital = 1000;
                        let apr = 0.329;
                        console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\n\n\nGiven that your initial investment is $${1000} and the APR of CAKE-BNB farm is 32.9%\n`);
    
                        let rewardWithoutYieldFarming = initialCapital * apr / 365 * dayNumber;
                        let rewardWithYieldFarming = initialCapital * (Math.pow((1 + (apr / 365)), dayNumber) - 1);
    
                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${dayNumber} Day(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = $${rewardWithoutYieldFarming}`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with Auto-Compounding = $${rewardWithYieldFarming}\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by Auto-Compounding = $${rewardWithYieldFarming - rewardWithoutYieldFarming}\n\n`);
                    }
                    comparisonForAutoCompoundingEverydayWithoutTakingAccountOfGasFee(number);
                    

                    let comparisonForAutoCompoundingEveryday = (number) => {
                        let dayNumber = parseInt(number);
                        let initialCapital = 10000;
                        console.log(`Given that your initial investment is US$${initialCapital} and the APR of CAKE-BNB farm is 32.9%\n`);
                        let totalGasFeePerCompound = 1.1;
                        let apr = 0.329;
                        
    
                        let dailyRewardWithoutYieldFarming = (initialCapital * (apr / 365) * dayNumber) - totalGasFeePerCompound;
    
                        // The equation is like that:
                        // let x be Initial Capital,
                        // let f be the Total Gas Fee per one time of Compounding,
                        // let r be the Daily Rate of APR,
                        // for example, if day number = 4, the equation is:
                        // reward from daily auto-compounding = x(r)^4 + (x-f)r^3 + (x-f)r^2 + (x-f)r - f
                        let partOfDailyAutoCompoundEquation = 0;
                        for (let i=1; i<dayNumber; i++) {
                            partOfDailyAutoCompoundEquation += (initialCapital - totalGasFeePerCompound) * Math.pow((apr/365), i);
                        }
                        let dailyRewardWithYieldFarming = partOfDailyAutoCompoundEquation + (initialCapital * Math.pow((apr/365), dayNumber)) - totalGasFeePerCompound; 
    
                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${dayNumber} Day(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${dailyRewardWithoutYieldFarming} USD`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with DAILY Auto-Compounding = ${dailyRewardWithYieldFarming} USD\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by DAILY Auto-Compounding = ${dailyRewardWithYieldFarming - dailyRewardWithoutYieldFarming} USD\n`);
                    }
                    // comparisonForAutoCompoundingEveryday(number);
    

                    let comparisonForAutoCompoundingEveryWeek = (number) => {
                        let weekNumber = parseInt(number);
                        let initialCapital = 100000000000;
                        console.log(`Given that your initial investment is US$${initialCapital} and the APR of CAKE-BNB farm is 32.9%\n`);
                        let totalGasFeePerCompound = 1.1;
                        let apr = 0.329;
                        
    
                        let weeklyRewardWithoutYieldFarming = (initialCapital * (apr / 365) * weekNumber * 7) - totalGasFeePerCompound;
    
                        // The equation is like that:
                        // let x be Initial Capital,
                        // let f be the Total Gas Fee per one time of Compounding,
                        // let r be the Daily Rate of APR,
                        // for example, if week number = 4, the equation is:
                        // reward from weekly auto-compounding = [x*(7r)^4] + [(x-f)*(7r)^3] + [(x-f)*(7r)^2] + (x-f)7r - f
                        let partOfWeeklyAutoCompoundingEquation = 0;
                        for (let i=1; i<weekNumber; i++) {
                            partOfWeeklyAutoCompoundingEquation += (initialCapital - totalGasFeePerCompound) * Math.pow((7 * (apr/365)), i);
                        }
                        let weeklyRewardWithYieldFarming = partOfWeeklyAutoCompoundingEquation + (initialCapital * Math.pow((7 * (apr/365)), weekNumber)) - totalGasFeePerCompound;
    
                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${weekNumber} Day(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${weeklyRewardWithoutYieldFarming} USD`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with WEEKLY Auto-Compounding = ${weeklyRewardWithYieldFarming} USD\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by WEEKLY Auto-Compounding = ${weeklyRewardWithYieldFarming - weeklyRewardWithoutYieldFarming} USD\n`);
                    }
                    // comparisonForAutoCompoundingEveryWeek(number)
    
                  recursiveAsyncReadLine();
                });
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
        await question1();
        await question2();
        rl.close();

    } catch(e) {
        console.error(e);
    }
}

main();