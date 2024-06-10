import { DepthManager } from "./DepthManager";

console.log("Hello via Bun!");

const SolInrMarket = new DepthManager('B-SOL_INR')
const SOlUsdMarket = new DepthManager('B-SOL_USDT')
const USDInrMarket = new DepthManager('B-USDT_INR')

const XAIInrMarket = new DepthManager('B-XAI_INR')
const XAIUsdMarket = new DepthManager('B-XAI_USDT')
setInterval(() => {
    console.log('SolInrMarket: ',SolInrMarket.getRelevantDepth())
    console.log('SOlUsdMarket: ',SOlUsdMarket.getRelevantDepth())
    console.log('USDInrMarket: ',USDInrMarket.getRelevantDepth())
   
    /**
     * Option 1 Buying selling SOL for INR, buy USDT from INR, buying SOL from INR
     * 
     * We can also try using XAI INR market    */
    const canGetInr = SolInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUSD = canGetInr / USDInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUSD/ SOlUsdMarket.getRelevantDepth().lowestAsk;

    console.log(`You can get ${1} SOL into ${canGetSol} SOL`)

    const canGetInr2 = XAIInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUSD2 = canGetInr2 / USDInrMarket.getRelevantDepth().lowestAsk;
    const canGetXAI = canGetUSD2/ XAIUsdMarket.getRelevantDepth().lowestAsk;

    console.log(`You can get ${1} XAI into ${canGetXAI} XAI`)
},2000)
