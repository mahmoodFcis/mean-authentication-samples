const mongoose=require("mongoose");

var schema=mongoose.Schema;

var productSchema=new schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        
    }
})

var productsModel=mongoose.model("Product",productSchema);
module.exports=productsModel;