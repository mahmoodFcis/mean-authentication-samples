const jwt=require("jsonwebtoken");
const config=require("config");
module.exports=function(req,res,next){

    if(req.header("x-auth-token"))
    {
        try {
            const token=req.header("x-auth-token");
            console.log(token);
            const decoded = jwt.verify(token, config.get('JWTPrivateKey'));
            console.log(decoded);
            req.user = decoded; 
            next();
          }
          catch (ex) {
            console.log(ex);
            res.status(400).send('Invalid token.');
          }
        
    }
    else res.status(403).send("You are not authorized to access");
}


