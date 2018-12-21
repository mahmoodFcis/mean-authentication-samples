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
            console.log(this.productsArr);
            for (var i = this.productsArr.length - 1; i >= 0; i--) {
                var max = 0;
                let maxIndex=0;
                for (var index = 0; index <=i; index++) {
                    if (this.productsArr[index].price > max)
                    {
                        maxIndex=index;
                        max = this.productsArr[index];
                    }
                }
                let currentVal=this.productsArr[i];

                this.productsArr[i]=max;
                this.productsArr[maxIndex]=currentVal;
               
            }

           return this.productsArr;
        }
        catch(e)
        {
          logs.error(e);
        }
        
    }




}