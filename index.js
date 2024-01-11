import express from "express";
import csrf from 'csurf';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express();

// Hbilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar cookiParser
app.use(cookieParser());

// Habilitar el CSRF
app.use(csrf({ cookie: true }));

// Conexión a la BD
try {
    await db.authenticate();
    db.sync(); // Ayuda a crear la tabla en caso de que no este creada
    console.log('Conexión exitosa a la base de datos')
} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta publica
app.use(express.static('public'));

// Routing
app.use('/', appRoutes);
app.use('/auth', userRoutes);
app.use('/', propertiesRoutes);
app.use('/api', apiRoutes);

// Definir un puerto y arrancar el proyecto
// const port = process.env.PORT || 3000;
const port = 3307 || 3000;

app.listen(port, () => {
    console.log('El servidor esta funcionando en el puerto:', port);
});