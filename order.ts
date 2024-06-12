import { resolve } from "bun";
import { key, secret } from "./config";

const request = require('request')
const crypto = require('crypto')
const baseurl = "https://api.coindcx.com"

export const createOrder = async (side:'buy'|'sell',market:string, price:number, quantity:number, client_order_id:string) => {

    return new Promise<void>((resolve) => {
        const timeStamp = Math.floor(Date.now());

        const body = {
            side,  //Toggle between 'buy' or 'sell'.
            "order_type": "limit_order", //Toggle between a 'market_order' or 'limit_order'.
            market, //Replace 'SNTBTC' with your desired market.
            "price_per_unit": price, //This parameter is only required for a 'limit_order'
            "total_quantity": quantity, //Replace this with the quantity you want
            "timestamp": timeStamp,
            client_order_id //Replace this with the client order id you want
        }
        
        const payload = new Buffer(JSON.stringify(body)).toString();
        const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
        
        const options = {
            url: baseurl + "/exchange/v1/orders/create",
            headers: {
                'X-AUTH-APIKEY': key,
                'X-AUTH-SIGNATURE': signature
            },
            json: true,
            body: body
        }
        
        request.post(options, function(error: any, response: any, body: any) {
            if(error){
                console.log(`Error creating order`)
            }else{
                console.log(body);
            }
            resolve()
        })
    })
}

export const cancelAll = async (market:string,side?:'buy'|'sell') => {
    return new Promise<void>((resolve) => {
        const timeStamp = Math.floor(Date.now());
        const body = {
            // side, //Toggle between 'buy' or 'sell'. Not compulsory
            market, //Replace 'SNTBTC' with your desired market pair.
            "timestamp": timeStamp
        }
    
        const payload = new Buffer(JSON.stringify(body)).toString();
        const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    
        const options = {
            url: baseurl + "/exchange/v1/orders/cancel_all",
            headers: {
                'X-AUTH-APIKEY': key,
                'X-AUTH-SIGNATURE': signature
            },
            json: true,
            body: body
        }
        request.post(options, function(error: any, response: any, body: any) {
            if(error){
                console.log(`Error cancelling order`)
            }else{
                console.log(body);
            }
            resolve()
        })
    })
    

}