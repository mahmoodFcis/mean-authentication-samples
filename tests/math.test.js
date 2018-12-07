const Math = require("../models/Math");
// testing the division function
describe("Division Test Suite", () => {

    // first test case to test division by 0
    it("should thorw an exception when passing a zero value to the dividedBy parameter", () => {

        // arrange
        let x = 10,
            y = 0;
        //assert
        expect(() => {
            Math.divide(x, y)
        }).toThrowError();
    })

    // happy path test case
    it("should return 2 when passing 4,2", () => {

        // arrange
        let x = 4,
            y = 2;
        // Act
        var result = Math.divide(x, y);
        //assert
        expect(result).toBe(2);
    })

    it("should return 2 when passing -4,-2", () => {

        // arrange
        let x = -4,
            y = -2;
        // Act
        var result = Math.divide(x, y);
        //assert
        expect(result).toEqual(2);
    })

});
