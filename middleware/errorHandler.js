module.exports = function (eventhandler) {
    
    return async (req, res) => {

        try {
            await eventhandler(req, res);
        } catch (err) {
            console.log(err);
        }
    }
}