const express = require('express');
const connection = require('../../middlerware/mysql');
const router = express.Router();

//Listado de todos los registros de “PetSitter”
router.get('/', async (req, res, next) => {
    try {
        let rows = await connection.asyncQuery('SELECT * FROM petsitter WHERE fecha_baja is null');
        res.send(rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

//Agregar información en tabla “PetSitter”
router.post('/', async (req, res, next) => {
    var msj = 'Son necesarios los siguente campos: CityId, Name, Last Name,Cellphone,email,photoURL';

    if (!req.body.CityId) return res.status(400).send(msj);
    if (!req.body.Name) return res.status(400).send(msj);
    if (!req.body.LastName) return res.status(400).send(msj);
    if (!req.body.Cellphone) return res.status(400).send(msj);
    if (!req.body.email) return res.status(400).send(msj);
    if (!req.body.photoURL) return res.status(400).send(msj);

    try {
        let rows = await connection.asyncQuery('INSERT INTO petsitter set ?', [req.body]);
        res.send('OK');
    } catch (error) {
        res.sendStatus(500);
    }
});

//Editar información de un registro de “PetSitter”
router.put('/:id', async (req, res, next) => {
    var msj = 'Es necesario enviar un parametro';

    if (Object.keys(req.body).length == 0) res.status(400).send(msj);

    const update = {}

    if (req.body.Name) update.Name = req.body.Name
    if (req.body.LastName) update.LastName = req.body.LastName
    if (req.body.Cellphone) update.Cellphone = req.body.Cellphone
    if (req.body.email) update.email = req.body.email
    if (req.body.photoURL) update.photoURL = req.body.photoURL



    try {
        let rows = await connection.asyncQuery('SELECT * FROM petsitter WHERE id = ? AND fecha_baja is null', [req.params.id]);
        if (rows.length == 0) return res.status(400).send('No existe esta ID');
        let rows2 = await connection.asyncQuery('UPDATE petsitter set ? WHERE id = ? AND fecha_baja is null', [update, req.params.id]);
        res.send('OK');
    } catch (error) {
        res.sendStatus(500);
    }
});

//Eliminar un registro de “PetSitter"
router.delete('/:id', async (req, res, next) => {
    var msj = 'Es necesario la id';

    if (!req.params.id) return res.status(400).send(msj);

    try {
        let rows = await connection.asyncQuery('SELECT * FROM petsitter WHERE id = ? AND fecha_baja is null', [req.params.id]);
        if (rows.length == 0) return res.status(400).send('No existe esta ID')
        let rows2 = await connection.asyncQuery('UPDATE petsitter set fecha_baja = now() WHERE id = ?', [req.params.id]);
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
        let rows = await connection.asyncQuery('SELECT a.id,concat_ws(" ",a.Name, a.Lastname) as Name,c.Nombre as State, b.City,a.cellphone,a.email,a.photoURL,a.fecha_alta  FROM petsitter a INNER JOIN city b ON a.CityId = b.id INNER JOIN state c ON b.Stateid = c.id WHERE c.id = ?', [req.params.id]);
        res.send(rows);
    } catch (error) {
        res.sendStatus(500);
    }
});

const PetSitterRouter = router
module.exports = PetSitterRouter;