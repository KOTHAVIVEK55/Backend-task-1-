const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true});


const model=mongoose.model("product",schema);
module.exports=model;