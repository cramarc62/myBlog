const mongoose= require('mongoose');
//const Posts=require('./Post_model');

const ObjectId = mongoose.Schema.Types.ObjectId
const CommentSchema=new mongoose.Schema({
    body:{
        type:String,
        required:[true]
    },
    post_id:{
        type:ObjectId,
        ref:'Posts',
        required:[true]
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    commentor_id:{
        type:ObjectId,
        required:[true]
    },
    pid:{
        type:ObjectId,
        default:null
    }

   /* post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }*/
})
module.exports= mongoose.model('Comment',CommentSchema);
