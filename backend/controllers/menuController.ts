import { Menu } from "../models/menuModel";
import { Response, Request } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Restaurant } from "../models/restaruentModel";
import mongoose from "mongoose";

export const addMenu = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {name,description,price} = req.body
        const file = req.file;
        if(!file){
            res.status(400).json({
                success:false,
                message:"Image file is required"
            });
            return;
        }
        const image = await uploadImageOnCloudinary(file as Express.Multer.File)
        const menu:any = await Menu.create({
            name,
            description,
            price,
            image
        })
        const restaruant = await Restaurant.findOne({user:req.id})
        if(restaruant){
            (restaruant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id)
            await restaruant.save()
        }
        res.status(201).json({
            success:true,
            message:"Menu added successfully",
            menu
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const editMenu = async (req:Request, res:Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {name, description, price} = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if(!menu){
             res.status(404).json({
                success:false,
                message:"Menu not found!"
            })
            return;
        }
        if(name) menu.name = name;
        if(description) menu.description = description;
        if(price) menu.price = price;

        if(file){
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }
        await menu.save();

         res.status(200).json({
            success:true,
            message:"Menu updated",
            menu,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"}); 
    }
}


export const deleteMenu = async(req:Request,res:Response) : Promise<void>=>{
    try {
        const {id} = req.params;
        const menu = await Menu.findByIdAndDelete(id)
        if(!menu){
            res.status(404).json({
                success:false,
                message:"Menu not found"
            })
            return;
        }
        const restaruant = await Restaurant.findOne({user:req.id})
        if(restaruant){
            (restaruant.menus as mongoose.Schema.Types.ObjectId[]).filter(menuex=>menuex !== menu._id)
            await restaruant.save()
        }
        res.status(200).json({
            success:true,
            message:"Menu deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"}); 
    }
}