const express = require('express');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/routes');
const helmet = require('helmet');

// Inicializar Express
const app = express();

// Conectar a la base de datos
connectDB();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: false }));

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "*"],
      },
    })
);

// Configura method-override para usar los métodos HTTP PUT y DELETE en los formularios
app.use(methodOverride('_method'));

//Ruta
app.use('/', contactRoutes);

//para las imagenes
app.use(express.static('assets'));
app.use(express.static('styles'));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
