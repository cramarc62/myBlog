const secret="sl_mysecret"
const jwt=require('jsonwebtoken');

 function auth(req,res,next){
    const token=req.header('x-auth-token');
    console.log("inside auth ");

    console.log(token);

    if(!token){
        return res.send({
            data:"no token, authorization denied"
        })
    }
    //console.log(token);

    try {
        const decoded=jwt.verify(token,secret)

        console.log("this is auth"+ decoded)
    
        req.user=decoded;
        next();
        
    } catch (error) {
        //localStorage.removeItem("user");
        res.send({
            data:"invalid token"
        })

        
    }
    //verify token
    


}
module.exports=auth;