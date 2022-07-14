const express = require('express');
const reviewsSchema = require('../models/reviews');

const router = express.Router();


// Add “Reviews”
router.post('/reviews', (req,res,next) =>{
    const reviews = reviewsSchema(req.body);
    reviews.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Get all “Reviews”
router.get('/reviews', (req,res,next) =>{
    reviewsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Get PettsitterId “Reviews” 
router.get('/reviews/:id', (req,res,next) =>{
    const {id} = req.params;
    reviewsSchema
    .find({PettsitterId: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// update “Reviews”
router.put('/reviews/:id', (req,res,next) =>{
    const {id} = req.params;
    const {rating,comments} = req.body;
    reviewsSchema
    .updateOne({
        PettsitterId: id
    },{
        $set: {rating,comments}
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// delete “Reviews”
router.delete('/reviews/:id', (req,res,next) =>{
    const {id} = req.params;
    reviewsSchema
    .remove({
        PettsitterId: id
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

module.exports = router;