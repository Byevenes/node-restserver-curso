require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));  // app.use son middleware simplemento son funciones que se disparan cada vez que pasa por aca, cada peticion
 
// parse application/json
app.use(bodyParser.json());


app.use( require('./routes/usuario') ); // request del archivo de usuario.js 


mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true} , (err , res) => {

    if (err) throw err;
    console.log('Base de Datos Online');
    
});

 
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});