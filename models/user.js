const mongoose=require('mongoose');
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const config=require("config");
/// definition schema of the user
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    Role: {
    type:String,required:true
    }
  });
  
var User=mongoose.model("User",userSchema);
User.generateAuthenticationToken=(role,name)=>{
    console.log({Role:role,Name:name});
    const token=jwt.sign({Role:role,Name:name},config.get("JWTPrivateKey"));
    return token;
}


module.exports=User;



