var productModel = require("./product");
const logs=require("../logs");
var productsArr = [];
module.exports = {
    productsArr,
    getAll() {
        productsArr = productModel.find({});
        return productsArr;
    },
    sort() {

        try
        {
            let sortedProducts = [];
            console.log(this.productsArr.length);
            for (var i = this.productsArr.length - 1; i >= 0; i--) {
                var max = 0;
                for (var index = 0; index <=i; index++) {
                    if (this.productsArr[index].price > max)
                        max = this.productsArr[index].price;
                }
                sortedProducts.push({price:max});
            }
            this.productsArr=sortedProducts;
            return sortedProducts;
        }
        catch(e)
        {
          logs.error(e);
        }
        
    }




}