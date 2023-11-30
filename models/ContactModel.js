const mongoose = require('mongoose');

// Esquema para el modelo Contacto
const contactSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    numeroCelular: {
        type: String,
        required: true,
        trim: true
    },
    correoElectronico: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingresa un correo electrónico válido']
    },
    foto: {
        type: String,
        required: false, // Puedes cambiarlo a 'true' si la foto es obligatoria
        trim: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
}, {
    timestamps: true // Opcional: añade marcas de tiempo de creación y actualización
});

// Crear el modelo 'Contact' usando el esquema definido
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
