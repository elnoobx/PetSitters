const express = require('express');
const City = require('../../models/city');

const router = express.Router();


// Add “City”
router.post('/', async (req, res, next) => {
    var msj = 'Es necesario enviar: state, name';

    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.body.state) return res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);

    try {
        const city = new City({
            state: req.body.state,
            name: req.body.name
        });

        await city.save();
        res.send(city);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Get all “City"
router.get('/', async (req, res, next) => {
    try {
        const city = await City.find({})
        res.send(city)
    } catch (error) {
        res.sendStatus(500)
    }
});

// update “City”
router.put('/:id', async (req, res, next) => {
    var msj = 'Es necesario enviar: state,name';
    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.params.id) return res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);
    if (!req.body.state) return res.status(400).send(msj);

    const { state, name } = req.body;

    try {
        const city = await City.updateOne({ _id: req.params.id }, { $set: { state, name } });
        res.send(city);
    } catch (error) {
        res.sendStatus(500);
    }
});

// delete “City”
router.delete('/:id', async (req, res, next) => {
    if (!req.params.id) return res.status(400).send(msj);

    try {
        const city = await City.remove({ _id: req.params.id });
        res.send(city);
    } catch (error) {
        res.sendStatus(500);
    }
});

const MCityRouter = router;
module.exports = MCityRouter;