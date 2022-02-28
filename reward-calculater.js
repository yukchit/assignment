const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your name? ', (name) => {
        console.log(`Hi, ${name}\n`);
      resolve()
    })
  })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        console.log("I'm a calculator for preparing the extra reward between using & without yield farming \nwhen you are investing into the CAKE-BNB farm in PancakeSwap.\n");
        console.log("Assuming your initial capital investing into the farm is $1000\n");

        var recursiveAsyncReadLine = function () {
            rl.question("How many day(s) after your first day of investment do you wanna know the comparison? ", function (day) {
                if (isNaN(parseInt(day)) || parseInt(day) <= 0)
                    return rl.close();
                
                let comparison = (day) => {
                    let dayNumber = parseInt(day);
                    console.log("Given that your initial investment is $1000 and the APR of CAKE-BNB farm is 32.9%\n");

                    let rewardWithoutYieldFarming = 1000 * 0.329 / 365 * dayNumber;
                    let rewardWithYieldFarming = 1000 * (Math.pow((1 + (0.329 / 365)), dayNumber) - 1)

                    console.log('\x1b[5m\x1b[94m\x1b[1m%s\x1b[0m', `For ${dayNumber} Day(s) after initial investment: \n`);
                    console.log('\x1b[91m%s\x1b[0m', `Reward without Yield Farming - $${rewardWithoutYieldFarming}`);
                    console.log('\x1b[92m%s\x1b[0m', `Reward with Yield Farming - $${rewardWithYieldFarming}\n`);
                }
                comparison(day);

              recursiveAsyncReadLine();
            });
          };
          recursiveAsyncReadLine();
    })
  }

const main = async () => {
  await question1();
  await question2();
  rl.close()
}

main()