const mongoose = require('mongoose');
const dbURI = 'mongodb://127.0.0.1:27017/TecsupDB'

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Base de datos conectada');
    } catch (err) {
        console.error('Error al conectar con la base de datos: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
