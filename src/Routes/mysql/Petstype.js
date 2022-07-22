const express = require('express');
const connection = require('../../middlerware/mysql');
const router = express.Router();

//Agregar “PetsType” a un “PetSitter”
router.post('/', async (req, res, next) => {
    var msj = 'Son necesarios los siguente campos: petsitterId, petstype';

    if (!req.body.petsitterId) return res.status(400).send(msj);
    if (!req.body.petstype) return res.status(400).send(msj);

    try {
        let rows = await connection.asyncQuery('INSERT INTO connection_pet_to_type set ?', [req.body]);
        res.send('OK');
    } catch (error) {
        return res.sendStatus(500);
    }
});

//Obtener todos los “PetsType” que tiene asignado un “PetSitter"
router.get('/:id', async (req, res, next) => {
    var msj = 'Es necesario la id';

    if (!req.params.id) return res.status(400).send(msj);

    try {
        let rows = await connection.asyncQuery('SELECT a.id,b.Description as Type FROM connection_pet_to_type a INNER JOIN petstype b ON a.petstype = b.id  WHERE petsitterId = ? AND a.fecha_baja is null', [req.params.id]);
        res.send(rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

//Quitar un “PetsType” a un “PetSitter”
router.delete('/:id', async (req, res, next) => {
    var msj = 'Es necesario la id';

    if (!req.params.id) return res.status(400).send(msj);

    try {
        let rows = await connection.asyncQuery('UPDATE connection_pet_to_type set fecha_baja = now() WHERE id = ? ', [req.params.id]);
        res.send('OK');
    } catch (error) {
        res.sendStatus(500);

    }
});


const petsTypeRouter = router
module.exports = petsTypeRouter;