import express from 'express'
import dotenv from 'dotenv'
import stripe from 'stripe'

// load variables 
dotenv.config()

// start server 

const app = express()

app.use(express.static('public'))
app.use(express.json())

//home route 

app.get('/' ,  ( req, res) => {
    res.sendFile('index.html', {root: 'public'})
})

app.get('/cancel' ,  ( req, res) => {
    res.sendFile('cancel.html', {root: 'public'})
})

app.get('/success' ,  ( req, res) => {
    res.sendFile('success.html', {root: 'public'})
})

//stripe 

let stripeGateway = stripe(process.env.stripe_api)
let DOMAIN = process.env.DOMAIN

app.post('/stripe-checkout', async (req, res) => {
    try {
        const lineItems = req.body.items.map(item => {
            const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100)
            console.log('item-price', item.price)
            console.log('unitAmount', unitAmount)

            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: item.name,
                        images: [item.img]
                    },
                    unit_amount: unitAmount
                },
                quantity: item.qt
            }
        })
        console.log('lineItems', lineItems)


        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${DOMAIN}/success`,
            cancel_url: `${DOMAIN}/cancel`,
            line_items: lineItems,
            billing_address_collection: 'required'
        });

        res.json(session.url)
    } 
    catch (error) {
        console.error('Error creating checkout session:', error)
        res.status(500).json({ error: 'Internal Server Error' }) 
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})