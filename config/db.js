const mongoose = require('mongoose');
const dbURI = 'mongodb://18.224.72.116:27017/TecsupDB'

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
