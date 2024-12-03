import { Request, Response } from "express";
import { Restaurant } from "../models/restaruentModel";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/orderModel";

export const createrestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    // console.log(restaurantName, city, country, deliveryTime, cuisines ,file)
    const restaruant = await Restaurant.findOne({ user: req.id });
    if (restaruant) {
      res.status(401).json({
        success: false,
        message: "restaruant alredy created by this user",
      });
      return;
    }
    if (!file) {
      res.status(401).json({
        success: false,
        message: "Image is required",
      });
      return;
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Restaruant created",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Interner server error",
    });
    return;
  }
};

export const getrestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus') ;
    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurant not found for this user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updaterestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurant not found for this user",
      });
      return;
    }

    if (restaurantName) restaurant.restaurantName = restaurantName;
    if (city) restaurant.city = city;
    if (country) restaurant.country = country;
    if (deliveryTime) restaurant.deliveryTime = deliveryTime;
    if (cuisines) restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
        const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getRestaruentOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      status: order.status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const searchRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searchText = (req.query.searchText as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query: any = {};

    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query);

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error searching restaurants:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleRestauant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id).populate({
      path: "menus",
      options: { sort: { createdAt: -1 } },
    });

    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching single restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
