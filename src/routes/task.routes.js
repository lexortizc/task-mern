const express = require('express');
const router = express.Router();

const Task = require('../models/task'); // Importando el modelo Task

// Creando método GET de la ruta '/'
// Método Mostrar Todo
router.get('/', async (req, res) => {
    //res.send('Hello World!'); // Retornando un mensaje en la petición
    const tasks = await Task.find();
    res.json(tasks); // Retornando el JSON de la petición
});

// Creando método GET de la ruta '/'
// Método Mostrar Unico (Buscar)
router.get('/:id', async (req, res) => {
    const ID = req.params.id; // Obteniendo el ID del GET
    const task = await Task.findById(ID); // Buscando la tarea
    res.json({ task }); // Retornando la tarea encontrada
});

// Creando método POST de la ruta '/'
// Método Crear
router.post('/', async (req, res) => {
    const { title, description } = req.body; // Obteniendo datos del body
    const task = new Task({ title, description }); // Llenando el modelo Task
    //console.log(task);
    await task.save(); // Guardando el modelo Task
    res.json({ status: 'Task Saved' }); // Mostrando msj de recibido
});

// Creando método PUT de la ruta '/:id'
// Método Actualizar
router.put('/:id', async (req, res) => {
    const ID = req.params.id; // Obteniendo el ID del PUT
    const { title, description } = req.body; // Obteniendo datos del body
    //const task = new Task({ title, description }); // Llenando el modelo Task
    //await Task.findByIdAndUpdate(ID, task); // Actualizando la tarea
    await Task.findByIdAndUpdate(ID, { title, description }); // Actualizando la tarea
    res.json({ status: 'Task Updated' }); // Mostrando msj de actualizado
});

// Creando método DELETE de la ruta '/:id'
// Método Eliminar
router.delete('/:id', async (req, res) => {
    const ID = req.params.id; // Obteniendo el ID del DELETE
    await Task.findByIdAndRemove(ID); // Eliminando la tarea
    res.json({ status: 'Task Deleted' }); // Mostrando msj de borrado
});

module.exports = router;