const express = require("express");
const user = require('../models/user');
const bcrypt = require("bcrypt");
const authorization=require("../middleware/authorization");
const authentication=require("../middleware/authenticate");
const router = express.Router();
const errorHandler=require("../middleware/errorHandler")
router.post('/login',errorHandler(async (req,res)=>{

   
    var _user=await user.findOne({email:req.body.email});
    if(!_user) return res.status(400).send(_user);
    
        const passwordMatch=await bcrypt.compare(req.body.password,_user.password);
        if(!passwordMatch)
        {
          console.log("password is not correct");
          return res.status(400).send("User name or password is not correct");
        }
        
         const token=user.generateAuthenticationToken(_user.Role,_user.name);
         res.header("x-auth-token",token).send({Id:_user._id
            , name:_user.name});
   
    

}));
router.get("/",async (req,res)=>{
var users=await user.find();
    res.send(users);

})
router.get("/:name", async (req, res) => {
    var user1 = await user.findOne({
        name: req.params.name
    });
    if (user1) {
        const token = user.generateAuthenticationToken();
        res.header('x-auth-token', token).send({
            name: user1.name,
            email: user1.email
        });
    }
})
router.post("/", async(req, res) => {
    // validate that the user already exists

    var newUser=await user.findOne({
        email: req.body.email
    });

    console.log(newUser);
    if (newUser) {
        res.status(400).send("user already exists");
    }

    var user1 = new user();
    user1.name = req.body.name;
    user1.email = req.body.email;
    user1.Role = req.body.Role;
    user1.password=req.body.password;
    
    try
    {
        var salt = await bcrypt.genSalt(10);
        var encryptedPassword = await bcrypt.hash(req.body.password, salt);
        user1.password = encryptedPassword;
       
    }
    catch(e)
    {
      user1.password=req.body.password;
    }
    finally
    {
        user1.save();
       
    }
    
    res.status(200).send("is Added");


});

router.delete('/',authentication,authorization,(req,res)=>{
// delete logic
res.send("deleted");
});
// don't forget to export your controller
module.exports=router;
