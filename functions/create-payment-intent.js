//domain/.netlify/functions/create-payment-intent


//just like we import packages in react we use require('package name').config() and invoke the config function

require('dotenv').config()

//connecting with stripe
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function(event,context) {
    if(event.body){
        const {cart, shipping_fee, total_amount} = JSON.parse(event.body)
        //In this function we generally setup our backend that fetches total_amount from our cart but since this is only for testing purposes we simply return shipping fee + total amount
        const calculateOrderAmount = () => {
            return shipping_fee + total_amount
        }
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount:calculateOrderAmount(),
                currency:'INR'
            })
            return {
                statusCode:200,
                body:JSON.stringify({clientSecret:paymentIntent.client_secret})
            }
        } catch (error) {
           return {
            statusCode:500,
            body:JSON.stringify({msg:error.message})
           } 
        }
    }
    return {
        statusCode: 200,
        body: 'Create Payment Intent'
    }
    
}
