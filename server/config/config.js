

// ARCHIVO PARA LA CONFIGURACION DE PUERTO Y PODER UNIRLA AL ARCHIUVO DEL SERVER.JS

// =================================
//              PUERTO
// ==================================

process.env.PORT = process.env.PORT || 3000;


// =================================
//             ENTORNO
// ==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 


// =================================
//            BASE DE DATOS
// ==================================


let urlDB;

if( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://zneel:1BWYIieZ1OhXtxKh@cluster0-o7r4j.mongodb.net/cafe';
}
process.env.URLDB = urlDB;
