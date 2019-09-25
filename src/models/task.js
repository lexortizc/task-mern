const mongoose = require('mongoose');
const { Schema } = mongoose; // Sirve para definir el esquema de los datos

//Creando el esquema para la Task
const TaskSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true}
});

//Exportando el modelo de la Task creada en TaskSchema
module.exports = mongoose.model('Task', TaskSchema);