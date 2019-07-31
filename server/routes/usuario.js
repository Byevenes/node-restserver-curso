const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');


const Usuario = require('../models/usuario');



const app = express();

app.get('/usuario', function (req, res){ // Peticion get 

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img') // definimos tipos de exclusiones
            .skip(desde) // salta los primeros x registros y luego limito que me muestro los siguientes 5 con el limit
            .limit(limite) // limita a la cantidad de usuario
            .exec((err, usuarios) => {

                if( err ){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({ estado: true }, (err, conteo) => {
                    
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });

                });

            }); // ejecutalo

});
 
app.post('/usuario', function (req, res) { //  Post para crear nuevos registros

    let body = req.body; // este body es el que va aparecer cuando el bodyparser procese cualquier peilot que reciba las peticiones sirve para post put y delete


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) =>{
            
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }


       // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
   
});

app.put('/usuario/:id', function (req, res){ //PUT actualizar registros put y patch se manejan igual

    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','email','img','role','estado'] );


    Usuario.findByIdAndUpdate( id, body,{ new: true, runValidators: true }, (err, usuarioDB) => {

        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        
        res.json({
            ok: true,
            usuario : usuarioDB
        });
    })

    
});

app.delete('/usuario/:id', function (req, res){ // Ya no se acostumbra a borrar registros, se acostumbra a cambiar el estado de algo pero el registro siempre se queda
    
    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };
    
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado){ // cuando se quiere eliminar un usuario ya eliminado
            return res.status(400).json({
                ok: false,
                err: {
                   message: 'Usuario no encontrado' 
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


});

module.exports = app;