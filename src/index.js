require("dotenv").config(); // Environment variables -- .env
const express = require('express');
const mongoose = require('mongoose');
//API - Routes
const ApiRouter = require("./Routes/api");

const app = express();
const port = process.env.port || 9000;


//Middlerware
app.use(express.json());

app.use('/api', ApiRouter);

//Mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongodb Connected'))
    .catch((error) => console.log(error));

app.listen(9000, () => console.log('RUN in port:', port));