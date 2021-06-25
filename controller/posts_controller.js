
const Posts =require('../models/Post_model');
const Comment=require('../models/Comments_model');
const { db } = require('../models/Comments_model');
const ObjectID = require('mongodb').ObjectID
//const upload= require('../server')
//const fileUpload= require('G:\\reactjs\\myBlog\\server.js')


//const Users=require('../models/User_model');

exports.getPosts=async (req,res,next)=>{
    try {
        //console.log('this is post model id type '+typeof(_id))
        const posts=await Posts.find();

        res.send({
            data:posts
        });
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }
exports.findpostsofacategory=async(req,res,next)=>{
    try{
        const{category}=req.body;
        console.log("this is from controller category");
        console.log(category);

    }catch{

    }
}
    

}
exports.singlePost=async (req,res,next)=>{
    try {

       /* const post=await Posts.findOne({_id:ObjectID(req.params.id)}).populate(
            'testComments'

        );

        console.log("this is from single post "+post)*/
        const post=  await Posts.aggregate([//ekhane model name used hobe
            
            { 
                $match:{
                        _id:ObjectID(req.params.id)
                      // _id:mongoose.mongo.ObjectID(req.params.id)
                       
               }
           },
            
            {
                $lookup:{
                    from: "comments",       //collection name use korte hobe
                    localField: "_id",   
                    foreignField: "post_id",
                    as: "testComments"         
                }
            }
        ], function(err, result) {
            result.forEach(element => {
                //console.log(element);
                res.send({data:element});
            });
           // res.send(result);
        }
        );
        //console.log("this is from single post1 "+post)

        //const commentsOfPost= await Comment.find({
          //  post_id:req.params.id
        //})
        /*.populate({
            path: 'testComments',
            //'testComments' 
            model: "Comment"
           // select: ['_id']
            //'Comments'
        })*/
        //res.json(post)
        //.exec((err,ppost)=>{
            //console.log("this is from inside exec " );
            //if(err) return "hello  nothing found";
            //testComments.testComments=testComments;
            //console.log('this is from single post '+post)
           //console.log('this is type of  single post '+ post)
           //console.log('this is that posts comments '+commentsOfPost)
         
        //console.log('this is from single post '+post)
            //const p=toString(post._id);
        //console.log('this is from changed single post id ')
        //const id=ObjectId(req.params.id)
        //console.log('this is const id- '+ typeof(id));
            
            /*const post=await Posts.findById(req.params.id, function (err, ppost) {
                console.log(ppost)
             }).populate({
                path: 'testComments',
                match: {
                   post_id: toString(req.params.id)
                }
             })
             .exec()
             console.log('this is from single post '+ post)*/
            

        //});
        /*Posts.findOne(req.params.id).populate('testComments').exec((err,post)=>{
            console.log("this is from inside exec " );
            if(err) return "hello  nothing found";
            post.testComments=testComments;
            console.log('this is from single post '+ post.testComments.body)
            

        });*/

        /*res.send({
            data:post
            //data2:commentOfPost
        });*/
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }
    

}

exports.addPost=async (req,res,next)=>{
    console.log("inside addpost1")

     try {
        //console.log(req.body)
        let sampleFile = req.files.post_image;
        //sampleFile.data.toString('utf8');
        sampleFile.mv(`${__dirname}/client/public/uploads/${sampleFile.name}`)
        console.log(sampleFile);
        console.log(req.body);
        console.log("inside addpost2")
        //const img=req.body.post_image;
        console.log("inside addpost3")
        //console.log(img);
        //img.mv(`${__dirname}/client/public/uploads/${img.name}`)
        //const post=await Posts.create(req.body);
        //console.log(post)
        /*res.send({
            data:post,
            fileName:post_image.name,
            filePath:`/uploads/${post_image.name}`
        });*/
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
exports.updatePost=async (req,res,next)=>{
    console.log("this is inside update post ");
    const {id}=req.user
    console.log(id);
    try {
        //const post=await Posts.update(req.body)
        //console.log("this is controller "+req.params.id);
        //console.log("this is controller "+req.body);
        const post= await Posts.findByIdAndUpdate(req.params.id, req.body, { new:  true, runValidators:  true });
        
       res.send({
            data:{}
        });
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
exports.deletePost=async (req,res,next)=>{
    try {
        //console.log("this is controller "+req.params.id);
        const post=await Posts.findById(req.params.id);
        console.log("before post delete  ");
        console.log(post);
        const related_comments=await Comment.deleteMany({post_id:req.params.id});
        console.log("these are related comments ");
        console.log(related_comments);
        //related_comments.remove()Comment.deleteMany()
        await post.remove();
        console.log("after post delete  ");
        console.log(post);
        res.send({
            data:post
        });
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
exports.editPost=async (req,res,next)=>{
    
    try {
       
        const post=await Posts.findById(req.params.id);
        
        res.send({
            data:post
        });
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
exports.addComment=async (req,res,next)=>{

    try {
       const com= await Comment.create(req.body);
       

        await Posts.findOneAndUpdate({_id:req.body.post_id} ,
            {
            $inc:{
                comments:1
            }
            
            })
     
        //const post= await Posts.findById({_id:req.body.post_id});
        ///await com.save();
        //post.testComments= [...post.testComments,com]

       // console.log('this is from comment '+post.testComments)
        res.send({
            data:com
        })

        
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
exports.getComments=async (req,res,next)=>{
   
        try {
            const comments=await Comment.find();
            //console.log(comments);
            res.send({
                data:comments
            });
        } catch (error) {
            return res.status(500).json({
                error:'server Error'
            })
            
        }
}