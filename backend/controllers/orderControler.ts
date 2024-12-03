import { Request, Response } from "express";
import { Order } from "../models/orderModel";
import { Restaurant } from "../models/restaruentModel";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type checkOutSessionRequest = {
    cartItems:{
        menuId:string,
        name:string,
        image:string,
        price:number,
        quantity:number
    }[],
    deliveryDetails:{
        name:string,
        email:string,
        address:string,
        city:string
    },
    restaurantId:string
}


export const getorders = async(req:Request,res:Response):Promise<void>=>{
    try {
        const orders = await Order.find({user:req.id}).populate('user').populate("restaurant")
        res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error "
        })
    }
}
    



export const createCheckOutSecion = async(req:Request,res:Response):Promise<void>=>{
    try {
        const  checkOutSessionRequest : checkOutSessionRequest = req.body;
        const restaurant= await Restaurant.findById(checkOutSessionRequest.restaurantId).populate('menus')
        if(!restaurant){
            res.status(404).json({
                success:false,
                message:"Restaruant not found"
            })
            return;
        }
        const order:any = new Order({
            restaurant:restaurant._id,
            user:req.id,
            deliveryDetails: checkOutSessionRequest.deliveryDetails,
            cartItems: checkOutSessionRequest.cartItems,
            status:"pending"
        })

        //line items
        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkOutSessionRequest,menuItems)
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card',"acss_debit",'amazon_pay'],
            shipping_address_collection:{
                allowed_countries:['GB','US','CA']
            },
            line_items:lineItems,
            mode:"payment",
            success_url:`${process.env.FRONTEND_URL}/order/status`,
            cancel_url:`${process.env.FRONTEND_URL}/cart`,
            metadata:{
                orderId: order._id?.toString() ?? '',
                images: JSON.stringify(menuItems.map((item:any)=>item.image))
            }
        })
        if(!session.url){
            res.status(400).json({
                success:false,
                mesage:"Error while creating session"
            })
            return;
        }
        await order.save()
        res.status(200).json({
            success:true,
            session
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error "
        })
    }
}



export const createLineItems = (checkoutSessionRequest: checkOutSessionRequest, menuItems: any) => {
    // 1. create line items
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
        if (!menuItem) throw new Error(`Menu item id not found`);

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })
    // 2. return lineItems
    return lineItems;
}