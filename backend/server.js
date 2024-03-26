require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

//middleware
app.use(express.json()) // parse json data for requests

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
// when the /api/workouts route is hit, we want to use the workoutRoutes
app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to the db & server listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })