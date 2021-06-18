const Posts =require('../models/Post_model');
const Comment=require('../models/Comments_model');
const User = require('../models/User_model');
const ObjectID = require('mongodb').ObjectID
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findById } = require('../models/Comments_model');
const secret="sl_mysecret"



exports.registerUser = async (req,res,next)=>{
     const {name,userName,email,password}=req.body;
     //console.log(name,userName,email,password);
     const findUserName = await User.findOne({userName:userName});
     const findEmail = await User.findOne({email:email});
     
     if(findUserName||findEmail)
     {
        return res.send({
            data:'username,email exists'
        });
     } 
     else{
         bcrypt.genSalt(10,(err,salt)=>{
             bcrypt.hash(req.body.password, salt, async(err,hash)=>{
                 req.body.password=hash;
                 const user = await User.create(req.body)
                 //console.log("this is new "+ user);
                 
                 jwt.sign(
                     {id:user.id},
                     "sl_mysecret",
                     {expiresIn: 3600},
                     (err,token)=>{
                       // console.log(token);
                        res.send({
                            token,
                            data:user
                        })

                     }
                 )
                 
                 
             })
         })
     }
    

}

exports.authenticateUser= async (req,res,next)=>{
    
    const {email,password}=req.body;
    const findUser = await User.findOne({email:email});

    if(!findUser)
    {
       return res.send({
           data:'user does not exist'
       });
    }
    else{
        bcrypt.compare(password,findUser.password)
               .then(isMatch=>{
                   if(!isMatch) return res.send({data:'invalid credentials'});
                   
                   jwt.sign(
                    {id:findUser.id},
                    "sl_mysecret",
                    {expiresIn: 3600},
                    (err,token)=>{
                       //console.log(token);
                       res.send({
                           token,
                           data:findUser
                       })

                    }
                )

               })
    }
}
exports.getUser=async (req,res,next)=>{
    const currentUser=await User.findById(req.user.id)
                                .select('-password')
    console.log(currentUser);
    
     res.send({
        data:currentUser
    })

}


 exports.validateToken=async (req,res,next)=>{
    try{
    const token=req.header('x-auth-token');
    console.log(token);
    if(!token){
        return res.json(false)
    }
    //console.log(token);
    const decoded=jwt.verify(token,secret)
    if(!decoded) return res.json(false)

    const user=await User.findById(decoded.id);
    if(!user) return res.json(false)

    return res.json (true)

    } catch (error) {
        res.send({
            data:"invalid token"
        })

        
    }
    //verify token
    


}
exports.allUsers = async(req,res,next)=>{
    
    try{
        const users= await User.find();
        res.send({
            data:users
        })
    }catch (error) {
        return res.status(500).json({
            error:'server Error'
        });
        
    }
    
}
exports.updateUser= async (req,res,next)=>{
    let sampleFile = req.files.profile_image;
    sampleFile.mv(`${__dirname}/client/public/uploads/${sampleFile.name}`);
    const {user_id,name,userName,email,password}=req.body;
    console.log(typeof(password));
    console.log (user_id);console.log(name);console.log(userName);console.log(email);console.log(password);
    const userfound=await User.findOne({_id:user_id});
    console.log(userfound);
    
    if(password===" "){
        try {
            console.log("inside first try");
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
        } catch (error) {
            console.log("inside fist catch");
        }
    }
    
    else{
        try {
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
                                image_url:`${sampleFile.name}`,
                                password:req.body.password
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
            
            
        } catch (error) {
            console.log("inside second catch");
        }
    }
    
}