const express = require('express');
const MCityRouter = require('./city');
const MPetSitterRouter = require('./petsitter');
const MpetsTypeRouter = require('./Petstype');
const MReviewRouter = require('./Reviews');
const MStateRouter = require('./state');

const router = express.Router();

router.use('/petsitter', MPetSitterRouter);
router.use('/petstype', MpetsTypeRouter);
router.use('/review', MReviewRouter);
router.use('/state', MStateRouter);
router.use('/city', MCityRouter);



const MongoApi = router;
module.exports = MongoApi;