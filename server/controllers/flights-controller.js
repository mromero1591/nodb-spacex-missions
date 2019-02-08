const flights = [];

module.exports = {
    read: (req,res) => {
        res.status(200).send(flights);
    },

    create: (req,res) => {
        //get the flight info from the body and create a new flight to add to the flights database.
        const {flightNumber,launchYear,launchSuccess,rocket,missionName, comment} = req.body;
        
        const newFlight = {
            flightNumber,
            launchYear,
            launchSuccess,
            rocket,
            missionName,
            comment
        }
        //look in the flights array to ensure that the array does not already have the flight
        const flightExist = flights.findIndex( flight => flight.flightNumber === newFlight.flightNumber);
        //if the flight is not already on the list then add the flight
        if(flightExist === -1) {
            flights.push(newFlight);
        }

        //return the flight.
        res.status(200).send(flights);

    },

    delete: (req,res) => {
        const {id} = req.params;

        const flightExist = flights.findIndex( flight => id == flight.flightNumber);
        
        if(flightExist !== -1) {
            flights.splice(flightExist,1);
        }

        res.status(200).send(flights);

    },

    update: (req,res) => {
        const {id} = req.params;
        const {flightNumber,launchYear,launchSuccess,rocket,missionName, comment} = req.body;
        
        const newFlight = {
            flightNumber,
            launchYear,
            launchSuccess,
            rocket,
            missionName,
            comment
        }
        const flightExist = flights.findIndex( flight => id == flight.flightNumber);
        if(flightExist !== -1) {
            flights.splice(flightExist, 1, newFlight);
        }

        res.status(200).send(flights);
    }
}