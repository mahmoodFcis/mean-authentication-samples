const express = require("express");
const user = require('../models/user');
const bcrypt = require("bcrypt");
const router = express.Router();
var users = [{
    name: "admin",
    role: "admin"
}, {
    name: "user1",
    role: "user"
}]
router.get('/', (req, res) => {

    res.send(users);

});
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
// don't forget to export your controller
module.exports=router;
