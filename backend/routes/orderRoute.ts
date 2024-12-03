import express from 'express'
import { isAuthenticated } from '../middelwares/isAuthenticated'
import { createCheckOutSecion, getorders } from '../controllers/orderControler'

const route = express.Router()

route.get('/',isAuthenticated,getorders)
route.get('/checkout/create-checkout-session',isAuthenticated,createCheckOutSecion)
// route.post('/webhook',isAuthenticated)


export default route