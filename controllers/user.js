const express = require("express");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authenticate");
const router = express.Router();
const errorHandler = require("../middleware/errorHandler");
const objectIdValidator = require("../middleware/objectIdValidator");
const joi = require("joi");
const userDebugger=require("debug")("userController");
router.post('/login', errorHandler(async (req, res) => {


    var _user = await User.findOne({
        email: req.body.email
    });
    if (!_user) return res.status(400).send(_user);


    const passwordMatch = await bcrypt.compare(req.body.password, _user.password);
    if (!passwordMatch) {
        userDebugger("password is not correct");
        return res.status(400).send("User name or password is not correct");
    }

    const token = jwt.sign({},config.get("private_key"));
    res.header("x-auth-token", token).send({
        Id: _user._id,
        name: _user.name
    });



}));
router.get("/", async (req, res) => {

    try {
        var users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }

})
router.get("/:name", async (req, res) => {
    var user1 = await User.findOne({
        name: req.params.name
    });

})
router.post("/", async (req, res) => {
    // validate that the user already exists

    var newUser = await User.findOne({
        email: req.body.email
    });

    if (newUser) {
        return res.status(400).send("user already exists");
    }
    var userSchema = {
        name: joi.string().required(),
        email: joi.string().email({ minDomainAtoms: 1 }).required()
    };
    let {
        name,
        email
    } = req.body;
    var validationResult = joi.validate({
        name,
        email
    }, userSchema);
    if (validationResult.error) return res.status(400).send("invalid user object");
    else {
        var user1 = new User();
        user1.name = req.body.name;
        user1.email = req.body.email;
        user1.Role = req.body.Role;

        try {
            var salt = await bcrypt.genSalt(10);
            var encryptedPassword = await bcrypt.hash(req.body.password, salt);
            user1.password = encryptedPassword;
            user1.save();
            const token = User.generateAuthenticationToken(user1.Role, user1.name);
            return res.header('x-auth-token', token).send({
                name: user1.name,
                email: user1.email
            });



        } catch (e) {
            userDebugger(e);
            res.status(500).send(e);
        }
    }



});
router.put("/:id", objectIdValidator, async (req, res) => {
    let id = req.params.id;

    /// validatee my object schema

    var joiSchema = {
        name: joi.string().required(),
        email: joi.email().required()
    };
    let {
        name,
        Role
    } = req.body;
    var validationResult = joi.validate({
        name,
        Role
    }, joiSchema);
    if (validationResult.error) {return res.status(400).send("invalid user request");}
    let _user = await User.findOne({
        _id: id
    });
    _user.email = req.body.email;
    await _user.save();

    _user.Role = req.body.Role;
    if (_user) {
        User.update({
            _id: id
        }, {

            $set: {
                email: req.body.email,
                name: req.body.name,
                Role: req.body.Role
            }
        });
        res.status(200).send(_user);

    } else res.status(404).send("User with id does not exist");


})
router.delete('/:id', authentication, authorization, objectIdValidator, (req, res) => {

    let id = req.params.id;
    user.deleteOne({
        _id: id
    });

    res.send("user deleted successfull");


});
// don't forget to export your controller
module.exports = router;
