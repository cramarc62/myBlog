const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')

const {registerUser,authenticateUser,getUser,validateToken,allUsers,updateUser}= require("../controller/users_controller");

router.route('/register')
      .post(registerUser);

router.route('/login')
      .post(authenticateUser);

router.route('/user')
      .get(auth,getUser)

router.route('/tokenIsValid')
      .post(validateToken)

//router.route('/updateUser')
      //.post(updateUser)

router.route('/allUsers')
      .get(allUsers)



module.exports=router;