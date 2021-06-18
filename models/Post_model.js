const mongoose=require('mongoose');
const Comments= require('./Comments_model');
const ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true]
    },
    post_body:{
        type:String,
        required:[true]
    },
    category: 
    { 
        type: String, 
        //ref: Comments,
        default:'Others'
        
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    comments: 
    { 
        type: Number, 
        //ref: Comments,
        default:0
        
    },
    creator_id:{
        type:ObjectId,
        required:true
    },
    image_url:{
         type: String 
    },
    testComments:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Comment'
    
        //required: false
    }]
   

})

/*const CommentSchema=new mongoose.Schema({
    body:{
        type:String,
        required:[true]
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
        //required:[true]
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports= mongoose.model('Comments',CommentSchema,'testComments');*/
module.exports= mongoose.model('Posts',PostSchema)
