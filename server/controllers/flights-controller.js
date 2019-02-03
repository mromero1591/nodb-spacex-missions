const flights = [];

module.exports = {
    read: (req,res) => {
        res.status(200).send(flights);
    }
}