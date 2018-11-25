const jwt=require("jsonwebtoken");
const config=require("config");
module.exports=function(req,res,next){

    if(req.header("x-auth-token"))
    {
        try {
            const token=req.header("x-auth-token");
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded; 
            next();
          }
          catch (ex) {
            res.status(400).send('Invalid token.');
          }
        
    }
    else res.status(403).send("You are not authorized to access");
}


