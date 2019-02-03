const express = require('express');
const bodyParser = require('body-parser');
const fc = require('./controllers/flights-controller');
const app = express();
app.use(bodyParser.json());



// ------ End Points ------ //
app.get('/api/flights', fc.read);
app.post('/api/flights', fc.create);

// ------ Server Listening ------ //
app.listen(3005, () => {
    console.log('Server is live on port 3005');
})