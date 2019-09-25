## Proceso de instalación

1. Crear el siguiente arbol:

- src: database.js, index.js
    - app: index.js
    - models: task.js
    - public:
    - routes: task.routes.js
- webpack.config.js
- .babelrc

2. sudo npm install express --yes
3. configurar el servidor
4. inicar el servidor
5. configurar `"start": "node ./src/index.js"` en los scripts de package.json

6. sudo npm install nodemon -D 
    (Sirve para recargar automaticamente el servidor)
5. configurar `"dev": "nodemon ./src/index.js"` en los scripts de package.json

7. sudo npm install morgan 
    (Sirve para ver/registrar las peticiones del cliente)
8. sudo npm install mongoose 
    (Permite conectarse a una Mongo DB y definir como lucen los datos en la DB)

9. sudo npm install webpack -D
    (Sirve para traducir cógido a JavaScript)
10. sudo npm install webpack-cli -D
    (Se debe instalar justo a webpack)
11. configurar `"webpack": "webpack --mode development --watch"` en los scripts de package.json

12. sudo npm install react react-dom react-router-dom -D
13. sudo npm install --save-dev @babel/core  
14. sudo npm install babel-loader -D
15. sudo npm install @babel/preset-react -D
16. sudo npm install npm i @babel/preset-env -D