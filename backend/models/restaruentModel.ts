import mongoose, { Document } from "mongoose";

export interface IsRestaruant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
}
export interface IsRestaruantDocuments extends IsRestaruant, Document {
  createdAt: Date;
  updatedAt: Date;
}
const restaurentSchema = new mongoose.Schema<IsRestaruantDocuments>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cuisines: [{ type: String, required: true }],
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurentSchema);