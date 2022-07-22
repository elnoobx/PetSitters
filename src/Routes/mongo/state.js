const express = require('express');
const State = require('../../models/state');

const router = express.Router();


// Add “State”
router.post('/', async (req, res, next) => {
    var msj = 'Es necesario enviar: ';

    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);

    try {
        const state = new State({
            name: req.body.name
        });

        await state.save();
        res.send(state);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Get all “State”
router.get('/', async (req, res, next) => {
    try {
        const state = await State.find({})
        res.send(state)
    } catch (error) {
        res.sendStatus(500)
    }
});

// update “State”
router.put('/:id', async (req, res, next) => {
    var msj = 'Es necesario enviar: name';
    if (Object.keys(req.body).length == 0) res.status(400).send(msj);
    if (!req.params.id) return res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);

    try {
        const state = await State.updateOne({ _id: req.params.id }, { $set: req.body.name });
        res.send(state);
    } catch (error) {
        res.sendStatus(500);
    }
});

// delete “State”
router.delete('/:id', async (req, res, next) => {
    if (!req.params.id) return res.status(400).send(msj);

    try {
        const state = await State.remove({ _id: req.params.id });
        res.send(state);
    } catch (error) {
        res.sendStatus(500);
    }
});

const MStateRouter = router;
module.exports = MStateRouter;