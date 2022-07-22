const express = require('express');
const Petsitter = require('../../models/petsitter');
const mongoose = require('mongoose');
const State = require('../../models/state');

const router = express.Router();

//Listado de todos los registros de “PetSitter”
router.get('/', async (req, res, next) => {
    try {
        const petsitter = await Petsitter.find({});
        res.send(petsitter);
    } catch (error) {
        res.sendStatus(500);
    }
});

//Agregar información en tabla “PetSitter”
router.post('/', async (req, res, next) => {
    var msj = 'Son necesarios los siguente campos: cityId, name, lastName,cellphone,email,photoURL';

    if (!req.body.cityId) return res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);
    if (!req.body.lastName) return res.status(400).send(msj);
    if (!req.body.cellphone) return res.status(400).send(msj);
    if (!req.body.email) return res.status(400).send(msj);
    if (!req.body.photoURL) return res.status(400).send(msj);

    try {
        const petsitter = new Petsitter({
            cityId: req.body.cityId,
            name: req.body.name,
            lastName: req.body.lastName,
            cellphone: req.body.cellphone,
            email: req.body.email,
            photoURL: req.body.photoURL
        });

        await petsitter.save();
        res.send(petsitter);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Editar información de un registro de “PetSitter”
router.put('/:id', async (req, res, next) => {
    var msj = 'Es necesario enviar un parametro';

    if (!req.body.cityId) return res.status(400).send(msj);
    if (!req.body.name) return res.status(400).send(msj);
    if (!req.body.lastName) return res.status(400).send(msj);
    if (!req.body.cellphone) return res.status(400).send(msj);
    if (!req.body.email) return res.status(400).send(msj);
    if (!req.body.photoURL) return res.status(400).send(msj);

    const { cityId, name, lastName, cellphone, email, photoURL } = req.body;

    var id = req.params.id;

    try {
        const petsitter = await Petsitter.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(id)
        }, {
            $set: {
                cityId, name, lastName, cellphone, email, photoURL
            }

        })
        res.send(petsitter);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Eliminar un registro de “PetSitter"
router.delete('/:id', async (req, res, next) => {
    var msj = 'Es necesario la id';

    if (!req.params.id) return res.status(400).send(msj);
    const petsitter = await Petsitter.deleteOne({ _id: req.params.id });
    res.send(petsitter);
    try {
        petsitter = Petsitter.deleteOne({ _id: req.params.id })
        res.send('OK');

    } catch (error) {
        res.sendStatus(500);
    }
});

//Registros de “PetSitter ” filtrado por “State”
router.get('/:id', async (req, res, next) => {
    var msj = 'Es necesario la id';

    if (!req.params.id) return res.status(400).send(msj);

    try {
        state = await State.aggregate([
            {
                $match: {
                    "_id": mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "cities",
                    localField: "_id",
                    foreignField: "state",
                    as: "city"
                }
            },
            {
                $unwind: {
                    path: "$city",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "petsitter",
                    localField: "city._id",
                    foreignField: "cityId",
                    as: "petsitter"
                }
            }, {
                $unwind: {
                    path: "$petsitter",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        res.send(state);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

const MPetSitterRouter = router
module.exports = MPetSitterRouter;