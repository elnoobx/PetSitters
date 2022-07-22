const express = require('express');
const MongoApi = require('./mongo/api');
const MySQLApi = require('./mysql/api');

const router = express.Router();

router.use('/mysql', MySQLApi);
router.use('/mongo', MongoApi);



const ApiRouter = router;
module.exports = ApiRouter;