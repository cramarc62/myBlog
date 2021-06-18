const path= require('path')
const mongoose=require('mongoose')
const express= require('express');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const auth= require("./middleware/auth")
const Posts =require('./models/Post_model');
const Category =require('./models/Category_model');
const User =require('./models/User_model');

/*const storage = multer.diskStorage({
  destination: `${__dirname}/client/public/uploads/`,
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
});

const upload = multer({ storage })*/



//const connectDB= require('./db');
//connectDB();
const DB=require('./config/keys').mongoURI;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('mongoDB connected...'))
  .catch(err=> console.log(err))

const app=express();
//app.use(express.urlencoded({ exten ded: true }));
const pposts=require('./routes/router_posts');
const users=require('./routes/router_users');



app.use(express.static('public'));
app.use(express.json());
app.use('/posts',pposts);
app.use('/users',users);
app.use(fileUpload());

/*app.post('/posts', upload.single("post_image"),(req,res,next)=>{
  console.log("inside addpost1")
  const file=req.file;
  console.log(file);

     try {
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
        });
    } catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }
  //res.send('Upload');
});*/
app.post('/updateUser',async(req,res)=>{
  const {user_id,name,userName,email,password,profile_image}=req.body;
  console.log(typeof(password));
  console.log (user_id);console.log(name);console.log(userName);console.log(email);console.log(password);
  const userfound=await User.findOne({_id:user_id});
  console.log(userfound);
  
  if(password===" "){
      try {
          console.log("inside first try");
          if(req.body.profile_image === 'error.jpg'){
            User.findOneAndUpdate({_id:user_id},
              {       
                  $set:{
                      name:name,
                      userName:userName,
                      email:email,
                      image_url:`error.jpg`
                      }
                  
              },{ new:true },(err, doc) => {
                  if (err) {
                      console.log("Something wrong when updating data!");
                  }
                  res.send({
                      data:doc
                  })
                  console.log(doc);})
          }else{
            let sampleFile = req.files.profile_image;
            //sampleFile.data.toString('utf8');
            sampleFile.mv(`${__dirname}/client/public/uploads/${sampleFile.name}`);
            User.findOneAndUpdate({_id:user_id},
              {       
                  $set:{
                      name:name,
                      userName:userName,
                      email:email,
                      image_url:`${sampleFile.name}`
                      }
                  
              },{ new:true },(err, doc) => {
                  if (err) {
                      console.log("Something wrong when updating data!");
                  }
                  res.send({
                      data:doc
                  })
                  console.log(doc);})
          }
          
      } catch (error) {
          console.log("inside fist catch");
      }
  }
  
  else{
      try {
        if(req.body.profile_image === 'error.jpg'){
          console.log("inside second try");
          
          bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(req.body.password, salt, async (err,hash)=>{
                  req.body.password=hash;
                  await User.findOneAndUpdate({_id:user_id},
                      {
      
                          $set:{
                              name:name,
                              userName:userName,
                              email:email,
                              password:req.body.password,
                              image_url:`error.jpg`
                          }
                      },{ new: true },(err, doc) => {
                          if (err) {
                              console.log("Something wrong when updating data!");
                          }
                          res.send({
                              data:doc
                          })
                      
                          console.log(doc);})
              })})
      
        }else{
          let sampleFile = req.files.profile_image;
            //sampleFile.data.toString('utf8');
            sampleFile.mv(`${__dirname}/client/public/uploads/${sampleFile.name}`);
            bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(req.body.password, salt, async (err,hash)=>{
                  req.body.password=hash;
                  await User.findOneAndUpdate({_id:user_id},
                      {
      
                          $set:{
                              name:name,
                              userName:userName,
                              email:email,
                              password:req.body.password,
                              image_url:`${sampleFile.name}`
                          }
                      },{ new: true },(err, doc) => {
                          if (err) {
                              console.log("Something wrong when updating data!");
                          }
                          res.send({
                              data:doc
                          })
                      
                          console.log(doc);})
              })})
          }
         
          
          
      } catch (error) {
          console.log("inside second catch");
      }
  }

})
app.post('/posts',auth,async (req,res)=>{
    console.log(req.body)
    //console.log(req.files)
    if(req.body.post_image === 'error.jpg'){
      let post =new Posts({
        title:req.body.title,
        post_body:req.body.post_body,
        creator_id:req.body.creator_id,
        category:req.body.category,
        image_url:`error.jpg`
      })
      await post.save();
      await Category.findOneAndUpdate({category_name:req.body.category} ,
        {
        $inc:{
            posts_no:1
        }
        
        })
      res.send({
              data:post
          });
      //console.log(sampleFile);

    }
    else{
      let sampleFile = req.files.post_image;
      //sampleFile.data.toString('utf8');
      console.log(__dirname);
      sampleFile.mv(`${__dirname}/client/public/uploads/${sampleFile.name}`);
      
      let post =new Posts({
        title:req.body.title,
        post_body:req.body.post_body,
        creator_id:req.body.creator_id,
        category:req.body.category,
        image_url:`${sampleFile.name}`
      })
      await post.save();
      await Category.findOneAndUpdate({category_name:req.body.category} ,
        {
        $inc:{
            posts_no:1
        }
        
        })

      res.send({
              data:post
          });
      console.log(sampleFile);

    }
   
    

})
//module.exports = fileUpload()


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT=process.env.PORT || 5001;
//app.get("/",(req,res)=>{
  //  res.send("hello from server");
//})
app.listen(PORT,console.log(`server is running on port ${PORT}`));
