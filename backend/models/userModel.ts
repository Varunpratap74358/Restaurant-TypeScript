import mongoose,{Document, Model} from "mongoose";

export interface IUser{
    fullname:string;
    email:string;
    password:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    lastLogin?:Date;
    isVerified?:boolean;
    resetPasswordToken?:string;
    resetPasswordTokenExpireAt?:string;
    verificationToken?:string;
    verificationTokenExpireAt?:string;
}
export interface IUserDocument extends IUser,Document{
    createdAt:Date;
    updatedAt:Date;
}


const userSchema = new mongoose.Schema<IUserDocument>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        default:"Update your address"
    },
    city:{
        type:String,
        default:"Update your city"
    },
    country:{
        type:String,
        default:"Update your city"
    },
    profilePicture:{
        type:String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false
    },
    //advanced auth
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordTokenExpireAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date
},{timestamps:true})

export const User : Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);