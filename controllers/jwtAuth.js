const jwt = require('jsonwebtoken');
require('dotenv').config()
const authenicateJWT = (req,res)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return req.status(403).json({
            messagea:'Unauthorization JWT token is require',
        })
    }
    try{
  const decode = jwt.verify(auth,process.env.SECRET_KEY);
  req.user = decode;
  next()
    }catch(err){
return req.status(403).json({
    message:"Unauthorize, Jwt token wrong or expire"
})
    }

    
}
module.exports = authenicateJWT;