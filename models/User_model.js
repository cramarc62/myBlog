const mongoose= require('mongoose');
//const Posts=require('./Post_model');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    userName:{
        type:String,
        unique:true,
        required:[true]
    },
    email:{
        type:String,
        //ref:'Posts'
        unique:true,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    image_url:{
        type: String 
    },
    compiled_posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }]
})
module.exports= mongoose.model('User',UserSchema);