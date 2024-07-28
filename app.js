const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors()); // when we'll have api calls, it won't block it and be able to send data
app.use(express.json()); // be able to send info in json format
app.use(express.urlencoded({ extended : false }));


// create


// read
app.get('/getLocations', (req, res) => {
    console.log('test');
})

// update


// delete


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + PORT);
});