const dotenv =  require("dotenv");
const Web3 = require("web3");
const ethers = require("ethers");
var Tx = require('ethereumjs-tx').Transaction;
var Common = require('ethereumjs-common').default;

var BSC_FORK = Common.forCustomChain(
    'mainnet',
    {
        name: 'Binance Smart Chain Mainnet',
        networkId: 56,
        chainId: 56,
        url: 'https://bsc-dataseed.binance.org/'
    },
    'istanbul',
);

dotenv.config();

const privateKey = Buffer.from(
    process.env.SENDER_PRIVATE_KEY,
    'hex',
  )

const main = async () => {
    const bsc = "https://bsc-dataseed.binance.org/";
    const web3 = new Web3(new Web3.providers.HttpProvider(bsc));

    const cakeBnbPid = 251;

    const provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_ADDRESS);

    const senderAddress = web3.eth.accounts.privateKeyToAccount(process.env.SENDER_PRIVATE_KEY).address;
    const senderMnemonic = process.env.MNEMONIC;
    const senderWallet = ethers.Wallet.fromMnemonic(senderMnemonic);
    const senderAccount = senderWallet.connect(provider);

    const pancakeFactoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const pancakeFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const pancakeFactoryContract = new web3.eth.Contract(pancakeFactoryAbi, pancakeFactoryAddress);
    const pancakeFactory = new ethers.Contract(pancakeFactoryAddress, ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'], senderAccount);

    const masterChefAddress = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";
    const masterChefAbi = [{"inputs":[{"internalType":"contract CakeToken","name":"_cake","type":"address"},{"internalType":"contract SyrupBar","name":"_syrup","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_cakePerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cake","outputs":[{"internalType":"contract CakeToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cakePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enterStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"leaveStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingCake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accCakePerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"syrup","outputs":[{"internalType":"contract SyrupBar","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const masterChefContract = new web3.eth.Contract(masterChefAbi, masterChefAddress);

    const pancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const pancakeRouterAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
    const pancakeRouterContract = new web3.eth.Contract(pancakeRouterAbi, pancakeRouterAddress);

    const cakeAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
    const cakeAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const cakeContract = new web3.eth.Contract(cakeAbi, cakeAddress);

    const cakeBnbAddress = "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0";
    const cakeBnbAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    const cakeBnbContract = new web3.eth.Contract(cakeBnbAbi, cakeBnbAddress);

    const bnbAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";



    // let approveCakeBnbLPToken = async () => {
    //   const totalSupply = await cakeBnbContract.methods.totalSupply().call();
    //   let approve = await cakeBnbContract.methods.approve(pancakeRouterAddress, totalSupply).call();
    //   approve === true ? console.log("Approve CAKE-BNB LP Spend Limit: SUCCESS\n") : console.log("Fail to approve CAKE-BNB LP Spend Limit\n");
    // };
    // approveCakeBnbLPToken().then(()=>{
    //     console.log(`Listening for new pairs...\n`);
    // });

    let calcPricesBetweenCakeAndBnb = async (amountOfCake) => {
      let prices = await pancakeRouterContract.methods.getAmountsOut(amountOfCake, [cakeAddress, bnbAddress]).call();
      console.log(`${web3.utils.fromWei(prices[0], "ether")} CAKE : ${web3.utils.fromWei(prices[1],"ether")} BNB\n`);
      return prices;
    };

    let calcPricesBetweenBnbAndUsdt = async (amountOfBnb) => {
        let prices = await pancakeRouterContract.methods.getAmountsOut(amountOfBnb, [bnbAddress, busdAddress]).call();
        // console.log(`${web3.utils.fromWei(prices[0], "ether")} BNB : ${web3.utils.fromWei(prices[1],"ether")} BUSD\n`);
        return prices;
    };
    
    let cakeBalance, cakeBnbBalance, totalCostOfGasFees, gasPrice;
    let gasLimit = 500000;
    // let gasPriceInGwei = 10; // in gwei
    let chainId = 56;
    let executed = 0;
    let transactionIterations = 0;


    let balances = async() => {
        console.log('\x1b[1m%s\x1b[0m', "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log('\x1b[96m%s\x1b[0m', "                                        BALANCES\n");

        cakeBalance = await cakeContract.methods.balanceOf(senderAddress).call();
        console.log(`Wallet - CAKE Balance: ${web3.utils.fromWei(cakeBalance, "ether")}`);
    
        let bnbBalance = await web3.eth.getBalance(senderAddress);
        console.log(`Wallet - BNB Balance: ${web3.utils.fromWei(bnbBalance, "ether")}`);
    
        cakeBnbBalance = await cakeBnbContract.methods.balanceOf(senderAddress).call();
        console.log(`Wallet - CAKE-BNB LP Balance: ${web3.utils.fromWei(cakeBnbBalance,"ether")}`);
    
        let pendingCake = await masterChefContract.methods.pendingCake(cakeBnbPid, senderAddress).call();
        console.log(`Farm - Pending CAKE from CAKE-BNB LP Farm: ${web3.utils.fromWei(pendingCake,"ether")}\n`);
    
        // console.log('\x1b[1m%s\x1b[0m', "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
    }

    let estimateTotalCostOfGasFees = async () => {
        console.log('\x1b[1m%s\x1b[0m', "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log('\x1b[96m%s\x1b[0m', "                                   ESTIMATED GAS FEES\n");

        gasPrice = await web3.eth.getGasPrice();
        console.log(`Gas Price: ${gasPrice} wei\n`);

        let gasForHarvest = await masterChefContract.methods.deposit(cakeBnbPid, 0).estimateGas({ from: senderAddress });
        console.log(`Gas for Harvesting CAKE: ${gasForHarvest} units`);
        let gasCostForHarvestingCake = gasForHarvest * gasPrice;
        console.log(`Gas Cost for Harvesting CAKE: ${web3.utils.fromWei(gasCostForHarvestingCake.toString(),"ether")} BNB\n`);

        let pricesOfHalfOfCakeBalance = await calcPricesBetweenCakeAndBnb((parseInt(cakeBalance) / 2).toString());

        let gasForSwap = await pancakeRouterContract.methods.swapExactTokensForETH(
            pricesOfHalfOfCakeBalance[0],
            pricesOfHalfOfCakeBalance[1],
            [cakeAddress, bnbAddress],
            senderAddress,
            Date.now() + 1000 * 60 * 10
            ).estimateGas({ from: senderAddress });
        console.log(`Gas for Swap: ${gasForSwap} units`);
        let gasCostForSwap = gasForSwap * gasPrice;
        console.log(`Gas Cost for Swap (transaction): ${web3.utils.fromWei(gasCostForSwap.toString(),"ether")} BNB\n`);

        let gasForAddingLiquidityETH = await pancakeRouterContract.methods.addLiquidityETH(
            cakeAddress,
            pricesOfHalfOfCakeBalance[0],
            Math.floor(parseInt(pricesOfHalfOfCakeBalance[0]) * 0.94).toString(),
            Math.floor(parseInt(pricesOfHalfOfCakeBalance[1]) * 0.94).toString(),
            "0x37214aF7f44d6dAAC4C69EA1B72CAF235ee151A7",
            Date.now() + 1000 * 60 * 10
            ).estimateGas({
            from: senderAddress,
            value: pricesOfHalfOfCakeBalance[1],
            });
        console.log(`Gas for Adding Liquidity: ${gasForAddingLiquidityETH} units`);
        let gasCostForAddingLiquidity = gasForAddingLiquidityETH * gasPrice;
        console.log(`Gas Cost for Adding Liquidity: ${web3.utils.fromWei(gasCostForAddingLiquidity.toString(),"ether")} BNB\n`);

        cakeBnbBalance = await cakeBnbContract.methods.balanceOf(senderAddress).call();
        let gasForReinvestingCakeBnbLP = await masterChefContract.methods.deposit(cakeBnbPid, cakeBnbBalance).estimateGas({ from: senderAddress });
        console.log(`Gas for Reinvesting CAKE-BNB LP: ${gasForReinvestingCakeBnbLP} units`);
        let gasCostForReinvestingLP = gasForReinvestingCakeBnbLP * gasPrice;
        console.log(`Gas Cost for Reinvesting CAKE-BNB LP: ${web3.utils.fromWei(gasCostForReinvestingLP.toString(),"ether")} BNB\n`
        );

        totalCostOfGasFees = gasCostForHarvestingCake + gasCostForSwap + gasCostForAddingLiquidity + gasCostForReinvestingLP;
        let pricesOfTotalCostOfGasFees = await calcPricesBetweenBnbAndUsdt(totalCostOfGasFees.toString());
        let totalCostOfGasFeesInBusd = pricesOfTotalCostOfGasFees[1];
        console.log('\x1b[35m%s\x1b[0m', `TOTAL COST OF ALL GAS FEES: ${web3.utils.fromWei(totalCostOfGasFees.toString(),"ether")} BNB (~${web3.utils.fromWei(totalCostOfGasFeesInBusd, "ether")} BUSD)\n`);
    };

    let comparePendingCakeAndEstimatedGasFees = async() => {
        console.log('\x1b[1m%s\x1b[0m', "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log('\x1b[96m%s\x1b[0m',"                COMPARE VALUES OF PENDING CAKE & TOTAL ESTIMATED GAS FEES\n");
        let pendingCake = await masterChefContract.methods.pendingCake(cakeBnbPid, senderAddress).call();
        let pricesOfPendingCake = await calcPricesBetweenCakeAndBnb(pendingCake);
        let valueOfPendingCakeInBnb = pricesOfPendingCake[1];
        console.log(`Value of Pending CAKE in BNB: ~${web3.utils.fromWei(valueOfPendingCakeInBnb, "ether")} BNB`);
        console.log(`Total Cost of all Gas Fees: ${web3.utils.fromWei(totalCostOfGasFees.toString(),"ether")} BNB`);

        if (parseInt(valueOfPendingCakeInBnb) > totalCostOfGasFees) {
            console.log("POSSIBLE TO MAKE ACTIONS");
            return true;
        } else {
            console.log('\x1b[5m\x1b[91m%s\x1b[0m', "DO NOT HARVEST SINCE PENDING CAKE REWARD IS LESS THAN TOTAL GAS FEES FOR TRANSACTION");
            console.log('\x1b[1m%s\x1b[0m', "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
            return false;
        }
    }

    let harvestCake = async() => {
        let pendingCake = await masterChefContract.methods.pendingCake(cakeBnbPid, senderAddress).call();
        console.log(`Farm - Pending CAKE from CAKE-BNB LP Farm: ${web3.utils.fromWei(pendingCake,"ether")}\n`);
        cakeBalance = await cakeContract.methods.balanceOf(senderAddress).call();
        console.log(`Wallet - CAKE Balance: ${web3.utils.fromWei(cakeBalance, "ether")}`);
        
        web3.eth.getTransactionCount(senderAddress, 'pending', function(nonceErr, nonceResponse) {
            if (!nonceErr) {
                var nonce = nonceResponse;
                var txParams = {
                    gas: web3.utils.toHex(gasLimit),
                    gasPrice: web3.utils.toHex(gasPrice),
                    nonce: web3.utils.toHex(nonce),
                    chainId: chainId,
                    value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
                    to: masterChefAddress
                };

                function executeTransaction(executed) {
                    masterChefContract.methods.deposit(cakeBnbPid, 0).call({ from: senderAddress, value: web3.utils.toHex(web3.utils.toWei('0', 'ether')) }, function(gasEstimateError, gasAmount){
                        if (!gasEstimateError) {
                            txParams.data = masterChefContract.methods.deposit(cakeBnbPid, 0).encodeABI();
                            web3.eth.accounts.signTransaction(txParams, process.env.SENDER_PRIVATE_KEY, function(signTransactionErr, signedTx) {
                                if (!signTransactionErr) {
                                    nonce += 1;
                                    txParams.nonce = web3.utils.toHex(nonce);
                                    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(sendSignedTransactionErr, transactionHash) {
                                        if (!sendSignedTransactionErr) {
                                            executed += 1;
                                            console.log("Successfully Harvested!");
                                            return;
                                        } else {
                                            console.log(sendSignedTransactionErr);
                                            return;
                                        }
                                        
                                    })
                                } else {
                                    console.log(signTransactionErr);
                                    return;
                                }
                            })
                        } else {
                            console.log(gasEstimateError);
                            return;
                        }
                    })
                }
                executeTransaction(executed);
            } else {
                console.log(nonceErr);
                return;
            }

        } );
    }

    let swapHalfOfCake = async() => {
        let cakeBnbBalance = await cakeBnbContract.methods.balanceOf(senderAddress).call();
        let pricesOfHalfOfCakeBalance = await calcPricesBetweenCakeAndBnb((parseInt(cakeBalance) / 2).toString());
        let pricesFromLittleCake = await calcPricesBetweenCakeAndBnb(web3.utils.toWei('0.001', 'ether'));

        let data = pancakeRouterContract.methods.swapExactTokensForETH(
            pricesFromLittleCake[0], 
            (Math.floor(parseInt(pricesFromLittleCake[1])*0.99)).toString(), 
            [cakeAddress, bnbAddress], 
            senderAddress,
            Date.now() + 1000 * 60 * 10
            );

        let count = await web3.eth.getTransactionCount(senderAddress);

        var rawTransaction = {
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: pancakeRouterAddress,
            value: web3.utils.toHex('0'),
            data: data.encodeABI(),
            chainId: chainId,
            from: senderAddress
        };  

        let transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
        transaction.sign(privateKey);

        var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        result.status === true ? console.log("Successfully Swap Half of CAKE into BNB!") : console.log("Fail to Swap Half of CAKE into BNB");
        return result;
    }

    let addLiquidityV2 = async() => {
        let bnb = 0.01;
        let pricesOfCakeAndBnb = await calcPricesBetweenCakeAndBnb(web3.utils.toWei((bnb*57.2095).toString(),'ether'));

        let data = pancakeRouterContract.methods.addLiquidityETH(
            cakeAddress,
            pricesOfCakeAndBnb[0],
            Math.floor((parseInt(pricesOfCakeAndBnb[0])*0.94).toString()).toString(),
            Math.floor((parseInt(pricesOfCakeAndBnb[1])*0.94).toString()).toString(),
            senderAddress,
            Date.now() + 1000 * 60 * 10
            );

        let count = await web3.eth.getTransactionCount(senderAddress);

        var rawTransaction = {
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: pancakeRouterAddress,
            value: web3.utils.toHex(pricesOfCakeAndBnb[1]),
            data: data.encodeABI(),
            chainId: chainId,
            from: senderAddress
        };  

        let transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
        transaction.sign(privateKey);

        var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        result.status === true ? console.log("Succussfully Add Liquidity to CAKE-BNB!") : console.log("Fail to Add Liquidity to CAKE-BNB");
        return result;    
    
    }

    let reinvestingCakeBnbLP = async() => {
        cakeBnbBalance = await cakeBnbContract.methods.balanceOf(senderAddress).call();
        console.log(`Wallet - CAKE-BNB LP Balance: ${web3.utils.fromWei(cakeBnbBalance, "ether")}`);

        let data = masterChefContract.methods.deposit(
            cakeBnbPid,
            web3.utils.toWei('0.001', 'ether')
            );

        let count = await web3.eth.getTransactionCount(senderAddress);

        var rawTransaction = {
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: masterChefAddress,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            data: data.encodeABI(),
            chainId: chainId,
            from: senderAddress
        };  

        let transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
        transaction.sign(privateKey);

        let result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        result.status === true ? console.log("Succussfully Re-investing CAKE-BNB LP into the farm!") : console.log("Fail to re-investing CAKE-BNB LP");
        return result;
        
    }




    balances().then(() => {
        estimateTotalCostOfGasFees().then(() => {
            comparePendingCakeAndEstimatedGasFees().then(r => {
                if (!r) {
                    harvestCake().then(() => {
                        swapHalfOfCake().then(()=> {
                            addLiquidityV2().then(() => {
                                reinvestingCakeBnbLP();
                            })
                        })
                    })
                } else {
                    return
                }
            })
        })
    })

    // pancakeFactory.on('PairCreated', async (token0, token1, pairAddress) => {
    //     console.log(`
    //         New pair detected
    //         =================
    //         token0: ${token0}
    //         token1: ${token1}
    //         pairAddress: ${pairAddress}
    //         `);
    //     if (token0 === bnbAddress || token1 === bnbAddress) {
    //         balances().then(() => {
    //             estimateTotalCostOfGasFees().then(() => {
    //                 comparePendingCakeAndEstimatedGasFees()
    //             })
    //         })
    //     } else {
    //         console.log("This pair does not have BNB");
    //     }
    // });
    
};

main();


// console.log((Math.floor(parseFloat(prices[0]))).toString());
// console.log((Math.floor(parseFloat(prices[0])* 0)).toString());
// console.log((Math.floor(parseFloat(prices[1])* 0)).toString());
