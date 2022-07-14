require("dotenv").config(); // Environment variables -- .env
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');
const myconn = require('express-myconnection');
//MySQL - API
const petRoutes = require('./Routes/petsitter');
const petTypeRoutes = require('./Routes/Petstype');
//MongoDB - API
const ReviewRoutes = require('./Routes/Reviews');

const app = express();
const port = process.env.port || 9000;

//MySQL Options
const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'petsitter'
}

//Middlerware
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json());
app.use('/api', ReviewRoutes,petRoutes,petTypeRoutes);

//Mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongodb Connected'))
.catch((error) => console.log(error));

app.listen(9000, () => console.log('RUN in port:',port));