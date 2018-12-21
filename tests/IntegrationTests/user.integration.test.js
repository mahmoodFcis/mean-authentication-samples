const request = require("supertest"); 
const User = require("../../models/user");

let server={};
let userAPIUrl="/api/Users/";
describe("testing user get methods", () => {

    beforeEach(async function () {

        server = require("../../index.js");
try
{
        var user1 = new User({
            name: "ahmed",
            Role: ["admin"],
            email: "mahmoud@email.com",
            password:"123456"
        });
        await user1.save();
        var user2 = new User({
            name: "mahmoud",
            Role: ["tester"],
            email: "mahmoud2@email.com",
            password:"123456"
        });
        await user2.save();
    }
    catch(e)
    {
        for(att in e.errors)
        {
            console.log(e.errors[att]);
        }
    }
        // add some users manually into the database
    })

    it("get all returns all records in the database", async function () {
        var res = await request(server).get(userAPIUrl);
        expect(res.status).toBe(200);
       // expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty("name", "ahmed");


    });

    afterEach(async function(){
        await User.remove({});
        await server.close();
    });

})

// test suite for the post endpoint
describe("testing user post endpoint", () => {

    beforeEach(async function () {
        server = require("../../index.js");
try
{
        var user1 = new User({
            name: "ahmed",
            Role: ["admin"],
            email: "mahmoud@email.com",
            password:"123456"
        });
        await user1.save();
        
    }
    catch(e)
    {
        for(att in e.errors)
        {
            console.log(e.errors[att]);
        }
    }
        // add some users manually into the database
    })

    it("test adding an existing user", async function () {
        var res = await request(server).post(userAPIUrl).send({name: "ahmed",
        Role: ["admin"],
        email: "mahmoud@email.com",
        password:"123456"}
        );

        expect(res.status).toBe(400);
        


    });

    it("test an invalid user object", async function () {
        var res = await request(server).post(userAPIUrl).send({name: "mshaaban",
        Role: ["admin"],
        email: "mahmoud",
        password:"2333"}
        );

        expect(res.status).toBe(400);
        


    });

    it("test adding a new user", async function () {
        var res = await request(server).post(userAPIUrl).send({name: "mshaaban2",
        Role: ["admin"],
        email: "mahmoud_new@email.com",
        password:"2333"}
        );

        expect(res.status).toBe(200);
        expect(res.body).not.toBeNull();


    });

    afterEach(async function(){
        await User.remove({});
        await server.close();
    });

})

