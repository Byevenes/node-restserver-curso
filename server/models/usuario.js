const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;  //Schema = Esquema


let usuarioSchema = new Schema( { // Declaramos un nuevo Esquema y luego creamos los campos que tendra la collecion
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] // Pedir que sea obligatorio
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String, 
        required: false
    }, // no es obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, // default: 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true // Cuando creemos un usuario este sera activo
    }, // Boolean
    google: {
        type: Boolean,
        default: false // Si el usuario no se crea con google siempre sera un usuario normal
    } // Boolean
});

usuarioSchema.methods.toJSON = function () {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser unicos'});


module.exports = mongoose.model( 'Usuario', usuarioSchema );