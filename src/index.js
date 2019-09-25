const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');


const app = express();


//Settings
app.set('port', process.env.PORT || 3000) //Tomando el puerto por defecto del servidor


//Middlewares (Funciones que se ejecutan antes de llegar a las Routes)
app.use(morgan('dev')); //Muestra las peticiones que se hacen al servidor
app.use(express.json()); //Verifica si los datos recibidos están en formato JSON


//Routes
app.use('/api/tasks', require('./routes/task.routes'));


//Static files
    //console.log(path.join(__dirname,'public')); 
    //Retorna: /Users/lexortiz/MEGAsync/Projects/mern-stack-task/src/public
app.use(express.static(path.join(__dirname,'public'))); //Llamando el index.html

//Starting server
const PUERTO = app.get('port');
app.listen(PUERTO, () => {
   console.log(`Server on port http://localhost:${PUERTO}/`);  
});