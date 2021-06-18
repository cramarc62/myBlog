const express=require('express');
const router=express.Router();
const auth= require("../middleware/auth")
const {getPosts,addPost,updatePost,deletePost,addComment,getComments,singlePost,findpostsofacategory} = require("../controller/posts_controller");

router.route('/')
      .get(getPosts)
      //.post(auth,addPost);



router.route('/:id')
      //.get(singlePost)
      .delete(auth,deletePost);

router.route('/edit/:id')
      .post(auth,updatePost);

router.route('/post/comment')
      .post(auth,addComment)

router.route('/comments')
      .get(getComments)

//router.route('/category')
  //    .get(findpostsofacategory)
      
router.route('/post/:id')
      .get(singlePost)


module.exports=router;