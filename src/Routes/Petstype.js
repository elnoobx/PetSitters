const express = require('express');
const router = express.Router();

//Agregar “PetsType” a un “PetSitter”
router.post('/PetType', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO connection_pet_to_type set ?',[req.body], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
});

//Obtener todos los “PetsType” que tiene asignado un “PetSitter"
router.get('/PetType/:id', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT a.id,b.Description as Type FROM connection_pet_to_type a INNER JOIN petstype b ON a.petstype = b.id  WHERE petsitterId = ? AND a.fecha_baja is null',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
    })
});

//Quitar un “PetsType” a un “PetSitter”
router.delete('/PetType/:id', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE connection_pet_to_type set fecha_baja = now() WHERE id = ? ',[req.params.id], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
});

module.exports = router;