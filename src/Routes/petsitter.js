const express = require('express');
const router = express.Router();

//Listado de todos los registros de “PetSitter”
router.get('/petSitter', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM petsitter WHERE fecha_baja is null', (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
    })
});

//Agregar información en tabla “PetSitter”
router.post('/petSitter', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO petsitter set ?',[req.body], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
});

//Editar información de un registro de “PetSitter”
router.put('/petSitter/:id', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE petsitter set ? WHERE id = ? AND fecha_baja is null',[req.body,req.params.id], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
     })
});

//Eliminar un registro de “PetSitter"
router.delete('/petSitter/:id', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE petsitter set fecha_baja = now() WHERE id = ? ',[req.params.id], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
});

//Registros de “PetSitter ” filtrado por “State”
router.get('/petSitter/:id', (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT a.id,concat_ws(" ",a.Name, a.Lastname) as Name,c.Nombre as State, b.City,a.cellphone,a.email,a.photoURL,a.fecha_alta  FROM petsitter a INNER JOIN city b ON a.CityId = b.id INNER JOIN state c ON b.Stateid = c.id WHERE c.id = ?',[req.params.id], (err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
});

module.exports = router;