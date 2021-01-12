const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/clientes';

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log("Conectado a la Base de Datos"))
.catch(err => console.log(err));

module.exports = mongoose;