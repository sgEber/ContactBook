const Contact = require('../models/ContactModel');

// Listar todos los contactos
exports.listAll = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('contacts', { contacts });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Mostrar formulario de creación de un nuevo contacto
exports.showCreateForm = (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    // Asegúrate de que el path sea correcto dependiendo de la estructura de tu proyecto
    const assetsPath = path.join(__dirname, '..', 'assets');
    fs.readdir(assetsPath, (err, files) => {
        if (err) {
            console.error('No se pudieron leer las imágenes:', err);
            return res.status(500).send('Error al cargar las imágenes.');
        }

        // Filtra los archivos para obtener solo las imágenes
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|avif)$/.test(file));

        res.render('create', { assets: imageFiles });
    });
};
// Crear un nuevo contacto
exports.create = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.redirect('/');
    } catch (err) {
        res.render('create', { error: err.message, formData: req.body });
    }
};

// Método para mostrar el formulario de actualización de un contacto
exports.showUpdateForm = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        const fs = require('fs');
        const path = require('path');
        
        const assetsPath = path.join(__dirname, '..', 'assets');
        fs.readdir(assetsPath, (err, files) => {
            if (err) {
                // Manejar error
                return res.status(500).send('No se pueden cargar las imágenes.');
            }
            const assets = files.filter(file => /\.(jpg|jpeg|png|gif|avif)$/i.test(file));
            res.render('update', { contact, assets });
        });
    } catch (err) {
        // Manejar error
        res.status(500).send('Error al cargar el formulario de actualización.');
    }
};

// Método para manejar la actualización de un contacto
exports.update = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.redirect('/'); // Redirige a la lista de contactos tras la actualización
    } catch (err) {
        // Si hay un error, renderiza de nuevo la vista 'update.ejs' con información del error
        res.render('update', { contact: req.body, error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send('No se encontró el contacto con el ID proporcionado.');
        }
        res.redirect('/');
    } catch (err) {
        console.error(err); // Esto te ayudará a depurar el error mostrándolo en la consola del servidor
        res.status(500).send("Error al eliminar el contacto.");
    }
};