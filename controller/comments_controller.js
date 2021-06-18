const Comments=require('../models/Comments_model');

exports.addComment=async (req,res,next)=>{

    try {
        console.log("this is controller "+req.body.comment_body);
        await Posts.updateOne({_id:req.body.post_id}, 
            {$set : 
            {comments: [{
                body: req.body.comment_body,
                post_id:req.body.post_id,
                date: Date.now()
            }]
            }
            }
        )
              
        //findByIdAndUpdate(req.body.post_id, req.body, { new:  true, runValidators:  true });
        
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }

}
