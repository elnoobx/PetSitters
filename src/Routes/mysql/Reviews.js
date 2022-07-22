const express = require('express');
const reviewsSchema = require('../../models/reviews');

const router = express.Router();


// Add “Reviews”
router.post('/', (req, res, next) => {
    const reviews = reviewsSchema(req.body);
    reviews.save()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ message: error }))
});

// Get all “Reviews”
router.get('/', (req, res, next) => {
    reviewsSchema
        .find()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ message: error }))
});

// Get PettsitterId “Reviews” 
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    reviewsSchema
        .find({ PettsitterId: id })
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ message: error }))
});

// update “Reviews”
router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { rating, comments } = req.body;
    reviewsSchema
        .updateOne({
            PettsitterId: id
        }, {
            $set: { rating, comments }
        })
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ message: error }))
});

// delete “Reviews”
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    reviewsSchema
        .remove({
            PettsitterId: id
        })
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ message: error }))
});

const ReviewRouter = router;
module.exports = ReviewRouter;