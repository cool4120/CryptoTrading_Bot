import axios from "axios";

export class DepthManager {
    private market:string;
    private asks : {
        [key:string]:string
    }
    private bids : {
        [key:string]:string
    }
    constructor(market:string) {
        this.market = market;
        this.bids = {},
        this.asks = {}
        setInterval(() => {
            this.pollMarket();
        },3000)
    }
    // gewtting the order book details 
     async pollMarket() { 
        const depth = await axios.get(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
        // const depth = await axios.get(`https://public.coindcx.com/market_data/orderbook?pair=B-SOL_INR`);
        this.bids = depth.data.bids;
        this.asks = depth.data.asks;
    }

     getRelevantDepth() {
         let highestBid = -100;
         let lowestAsk = 1000000000;
         Object.keys(this.bids).map((x) => {
            if(parseFloat(x) > highestBid){
                highestBid = parseFloat(x)
            }
         })

         Object.keys(this.asks).map((x) => {
            if(parseFloat(x) < lowestAsk){
                lowestAsk = parseFloat(x)
            }
         })

         return {
            highestBid,
            lowestAsk
         }
    }
}