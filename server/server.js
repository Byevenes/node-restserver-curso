require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))  // app.use son middleware simplemento son funciones que se disparan cada vez que pasa por aca, cada peticion
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function (req, res){ // Peticion get 
    res.json('Get Usuario')
})
 
app.post('/usuario', function (req, res) { //  Post para crear nuevos registros

    let body = req.body; // este body es el que va aparecer cuando el bodyparser procese cualquier peilot que reciba las peticiones sirve para post put y delete

    if( body.nombre === undefined ){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        }) // que codiugo de respuesta qquiero que se le envio a la solicitud
    } else {
        res.json({
        persona: body
    })
    }

    
})

app.put('/usuario/:id', function (req, res){ //PUT actualizar registros put y patch se manejan igual

    let id = req.params.id;

    res.json({
        id
    })
})

app.delete('/usuario', function (req, res){ // Ya no se acostumbra a borrar registros, se acostumbra a cambiar el estado de algo pero el registro siempre se queda
    res.json('Delete Usuario')
})
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
})