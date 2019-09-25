const mongoose = require('mongoose');

const URI = 'mongodb+srv://sheikah:kira1990@cluster0-nmdpi.mongodb.net/test?retryWrites=true&w=majority';

//Realizando la conexión con la BD
mongoose.connect(URI)
.then(db => console.log('DB is connected')) //Mostrando notificación
.catch(e => console.error(e)); //Mostrando error

module.exports = mongoose;