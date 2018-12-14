require("jest");
const log=require("../logs");
let product = require("../models/product_business");

// test sorting
  
describe('test sorting of products', () => {

    it("should sort the price of products ascending", () => {
        // Arrange
        let sortedArray = [{
            price: 20
        }, {
            price: 3
        }, {
            price: 500
        }];
        //Act
        product.productsArr=sortedArray;
        product.getAll = jest.fn().mockReturnValue(sortedArray);
        log.error=jest.fn();
        product.productsArr= product.sort();
        console.log(product.productsArr.length);
        //Assert
        expect(product.productsArr[2]).toHaveProperty("price",500);
       

    })
})