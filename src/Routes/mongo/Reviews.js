const express = require('express');
const Review = require('../../models/reviews');

const router = express.Router();


// Add “Reviews”
router.post('/', async (req, res, next) => {
    var msj = 'Es necesario enviar: PettsitterId,rating,comments';

    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.body.PettsitterId) return res.status(400).send(msj);
    if (!req.body.rating) return res.status(400).send(msj);
    if (!req.body.comments) return res.status(400).send(msj);

    try {
        const review = new Review({
            PettsitterId: req.body.PettsitterId,
            rating: req.body.rating,
            comments: req.body.comments
        });

        await review.save();
        res.send(review);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Get all “Reviews”
router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.find({})
        res.send(reviews)
    } catch (error) {
        res.sendStatus(500)
    }
});

// Get PettsitterId “Reviews” 
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.find({ PettsitterId: id });
        res.send(review);
    } catch (error) {
        res.sendStatus(500);
    }
});

// update “Reviews”
router.put('/:id', async (req, res, next) => {
    var msj = 'Es necesario enviar: PettsitterId,rating,comments';
    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.params.id) return res.status(400).send(msj);
    if (!req.body.rating) return res.status(400).send(msj);
    if (!req.body.comments) return res.status(400).send(msj);

    const { rating, comments } = req.body;

    try {
        const review = await Review.updateOne({ PettsitterId: req.params.id }, { $set: { rating, comments } });
        res.send(review);
    } catch (error) {
        res.sendStatus(500);
    }
});

// delete “Reviews”
router.delete('/:id', async (req, res, next) => {
    if (!req.params.id) return res.status(400).send(msj);

    try {
        const review = await Review.remove({ PettsitterId: req.params.id });
        res.send(review);
    } catch (error) {
        res.sendStatus(500);
    }
});

const MReviewRouter = router;
module.exports = MReviewRouter;