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
                rl.question("How many Week(s) after your first day of investment do you wanna know the comparison?\n", function (number) {
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
                    // comparisonForAutoCompoundingEverydayWithoutTakingAccountOfGasFee(number);
                    

                    let comparisonForAutoCompoundingEveryday = (number) => {
                        let dayNumber = parseInt(number);
                        let initialCapital = 10000;
                        let totalGasFeePerCompound = 1.1;
                        let apr = 0.329;
                        console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\nGiven that your initial investment is US$${initialCapital}, \nthe APR of CAKE-BNB farm is ${apr * 100}%, \nand the total gas fee per compounding is US$${totalGasFeePerCompound}\n`);
    
                        let dailyRewardWithoutYieldFarming = (initialCapital * (apr / 365.25) * dayNumber) - totalGasFeePerCompound;

                        // The equation:
                        // let x be Initial Capital,
                        // let f be the Total Gas Fee per one time of Compounding,
                        // let r be the Daily Rate of APR,
                        // 1st Day Reward = r(x) - f;
                        // 2nd Day Reward = r(x + FirstDayReward) - f;
                        // 3rd Day Reward = r(x + FirstDayReward + SecondDayReward) - f;
                        // 4th Day Reward = r(x + FirstDayReward + SecondDayReward + ThirdDayReward) -f;
                        // 5th Day Reward = r(x + FirstDayReward + SecondDayReward + ThirdDayReward + FourthDayReward) - f;
                        // ...

                        let dailyRewardWithYieldFarming = 0;
                        for (let i=1; i<dayNumber; i++) {
                            dailyRewardWithYieldFarming += (apr / 365.25) * (initialCapital + dailyRewardWithYieldFarming) - totalGasFeePerCompound;
                        }
    
                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${dayNumber} Day(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${dailyRewardWithoutYieldFarming} USD`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with DAILY Auto-Compounding = ${dailyRewardWithYieldFarming} USD\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by DAILY Auto-Compounding = ${dailyRewardWithYieldFarming - dailyRewardWithoutYieldFarming} USD\n`);
                    }
                    // comparisonForAutoCompoundingEveryday(number);
    

                    let comparisonForAutoCompoundingEveryWeek = (number) => {
                        let weekNumber = parseInt(number);
                        let initialCapital = 10000;
                        let totalGasFeePerCompound = 1.1;
                        let apr = 0.329;
                        console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\nGiven that your initial investment is US$${initialCapital}, \nthe APR of CAKE-BNB farm is ${apr * 100}%, \nand the total gas fee per compounding is US$${totalGasFeePerCompound}\n`);
                        
    
                        let weeklyRewardWithoutYieldFarming = (initialCapital * (apr / 365.25) * weekNumber * 7) - totalGasFeePerCompound;

                        // The equation:
                        // let x be Initial Capital,
                        // let f be the Total Gas Fee per one time of Compounding,
                        // let r be the Daily Rate of APR,
                        // 1st Week Reward = 7r(x) - f;
                        // 2nd Week Reward = 7r(x + FirstWeekReward) - f;
                        // 3rd Week Reward = 7r(x + FirstWeekReward + SecondWeekReward) - f;
                        // 4th Week Reward = 7r(x + FirstWeekReward + SecondWeekReward + ThirdWeekReward) -f;
                        // 5th Week Reward = 7r(x + FirstWeekReward + SecondWeekReward + ThirdWeekReward + FourthWeekReward) - f;
                        // ...

                        let weeklyRewardWithYieldFarming = 0;
                        for (let i=1; i<weekNumber; i++) {
                            weeklyRewardWithYieldFarming += 7 * (apr / 365.25) * (initialCapital + weeklyRewardWithYieldFarming) - totalGasFeePerCompound;
                        }

                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${weekNumber} Week(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${weeklyRewardWithoutYieldFarming} USD`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with WEEKLY Auto-Compounding = ${weeklyRewardWithYieldFarming} USD\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by WEEKLY Auto-Compounding = ${weeklyRewardWithYieldFarming - weeklyRewardWithoutYieldFarming} USD\n`);
                    }
                    comparisonForAutoCompoundingEveryWeek(number);
                        

                    let comparisonForAutoCompoundingEveryMonth = (number) => {
                        let monthNumber = parseInt(number);
                        let initialCapital = 10000;
                        let totalGasFeePerCompound = 1.1;
                        let apr = 0.329;
                        console.log('\x1b[93m\x1b[1m%s\x1b[0m', `\nAssuming there are 30.4375 Days (365.25 / 12) per month\n`);
                        console.log('\x1b[93m\x1b[1m%s\x1b[0m', `Given that your initial investment is US$${initialCapital}, \nthe APR of CAKE-BNB farm is ${apr * 100}%, \nand the total gas fee per compounding is US$${totalGasFeePerCompound}\n`);
                        
                        let monthlyRewardWithoutYieldFarming = (initialCapital * (apr / 365) * monthNumber * 30) - totalGasFeePerCompound;
    
                        // The equation:
                        // let x be Initial Capital,
                        // let f be the Total Gas Fee per one time of Compounding,
                        // let r be the Daily Rate of APR,
                        // let m be the exact days of a month,
                        // 1st Month Reward = mr(x) - f;
                        // 2nd Month Reward = mr(x + FirstMonthReward) - f;
                        // 3rd Month Reward = mr(x + FirstMonthReward + SecondMonthReward) - f;
                        // 4th Month Reward = mr(x + FirstMonthReward + SecondMonthReward + ThirdMonthReward) -f;
                        // 5th Month Reward = mr(x + FirstMonthReward + SecondMonthReward + ThirdMonthReward + FourthMonthReward) - f;
                        // ...

                        let monthlyRewardWithYieldFarming = 0;
                        for (let i=1; i<monthNumber; i++) {
                            monthlyRewardWithYieldFarming += (365.25 / 12) * (apr / 365.25) * (initialCapital + monthlyRewardWithYieldFarming) - totalGasFeePerCompound;
                        }

                        console.log('\x1b[5m\x1b[93m\x1b[1m%s\x1b[0m', `For ${monthNumber} Month(s) after initial investment: \n`);
                        console.log('\x1b[91m%s\x1b[0m', `Reward of Normal Staking = ${monthlyRewardWithoutYieldFarming} USD`);
                        console.log('\x1b[92m%s\x1b[0m', `Reward of Yield Farming with MONTHLY Auto-Compounding = ${monthlyRewardWithYieldFarming} USD\n`);
                        console.log('\x1b[96m%s\x1b[0m', `Extra Reward by MONTHLY Auto-Compounding = ${monthlyRewardWithYieldFarming - monthlyRewardWithoutYieldFarming} USD\n`);
                    }
                    // comparisonForAutoCompoundingEveryMonth(number);
    
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