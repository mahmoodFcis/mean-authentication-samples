module.exports=function(req,res,next)
{
    console.log(req.user);
    if(req.user.Role==="admin")
    {
        next();
    }
    else res.status(403).send("You are not allowed as an admin");
}