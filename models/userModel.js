const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:String},
    address:{type:String},
    additional:{type:String},
    profile:{type:String}






})


const users=mongoose.model("users",userSchema)

module.exports=users