import express from 'express'
import { createrestaruant, getrestaruant, getRestaruentOrder, getSingleRestauant, searchRestaurant, updateOrderStatus, updaterestaruant } from '../controllers/restaruantController'
import { isAuthenticated } from '../middelwares/isAuthenticated'
import upload from '../middelwares/multer'

const route = express.Router()

route.post('/',isAuthenticated,upload.single("imageFile"),createrestaruant)
route.get('/',isAuthenticated,getrestaruant)
route.put('/',isAuthenticated,upload.single("imageFile"),updaterestaruant)
route.get('/order',isAuthenticated,getRestaruentOrder)
route.put('/order/:orderId/status',isAuthenticated,updateOrderStatus)
route.get('/search/:searchText',isAuthenticated,searchRestaurant)
route.get('/:id',isAuthenticated,getSingleRestauant)




export default route