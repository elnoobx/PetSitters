const { application } = require('express');
const express = require('express');
const PetSitterRouter = require('./petsitter');
const petsTypeRouter = require('./Petstype');
const ReviewRouter = require('./Reviews');

const router = express.Router();

router.use('/petsitter', PetSitterRouter);
router.use('/petstype', petsTypeRouter);
router.use('/review', ReviewRouter);



const MySQLApi = router;
module.exports = MySQLApi;