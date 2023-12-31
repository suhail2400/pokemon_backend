import * as mongoose from 'mongoose';

export const UserSchema =  new mongoose.Schema({
    userName:{ type:String, required: true},
    email: { type:String,required: true, unique:true,},
    phone: {type:String, required:true,},
    password: {type:String, required: true}
})


export interface User extends mongoose.Document {
         id: string,   userName: string,   email: string,   phone: string, password: string,
}