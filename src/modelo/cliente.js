const mongoose = require('mongoose');
const {Schema} = mongoose;

const ClienteSchema = new Schema({
    nombre: {type: String, require: true},
    edad: {type: Number, require: true},
    telefono: {type: String, require: false},
    empresa: {type: String, require: true}
});

module.exports = mongoose.model('Cliente', ClienteSchema);