import { DepthManager } from "./DepthManager";
import { cancelAll, createOrder } from "./order";

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

      /**
     * Option 2 In this stratergy we will be holding Inr intitally convert it into SOl then 
     * convert SOl to USD  and convert USD to inr in by sellig ur usdt
     *  */
    const initialInr = SolInrMarket.getRelevantDepth().highestBid + 0.001; // biding slightly higher than the highest bid where where initialInr indicate amount req for getting SOl
    const canGetUSD3 = SOlUsdMarket.getRelevantDepth().highestBid;  
    const canGetInr3 = canGetUSD3 * USDInrMarket.getRelevantDepth().highestBid;

    console.log(`You can get ${initialInr} SOL into ${canGetInr3} SOL`)

     /**
     * Option 3 In this stratergy we will be holding XAI intitally convert it into SOl then 
     * convert SOl to USD 
     *  */
    const canGetInr2 = XAIInrMarket.getRelevantDepth().lowestAsk - 0.001; // selling XAI to get INR for price lower than lowest ask
    const canGetUSD2 = canGetInr2 / USDInrMarket.getRelevantDepth().lowestAsk; // amount of USD available from USDInr market 
    const canGetXAI = canGetUSD2/ XAIUsdMarket.getRelevantDepth().lowestAsk; // now we try to understand amount of XAI we get from USD

    console.log(`You can get ${1} XAI into ${canGetXAI} XAI`)
},2000)


setInterval(async () => {
    await createOrder('buy','XAIINR',200,1,'abc')
    await cancelAll('XAIINR')

},1000)
