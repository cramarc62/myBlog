const mongoose=require('mongoose');
const Comments= require('./Comments_model');
const ObjectId = mongoose.Schema.Types.ObjectId

const CategorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:[true]
    },
    posts_no:{
        type:Number,
        required:[true],
        default:0
    }
   

})


module.exports= mongoose.model('Category',CategorySchema)
