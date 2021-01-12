const express = require('express');
const router = express.Router();
const Cliente = require('../modelo/cliente');


router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    console.log(clientes);
    res.json({
        clientes: clientes
    });
});
router.get('/:id', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json({
        cliente: cliente
    });
});


router.post('/', async (req, res) => {
    const {nombre, edad, telefono, empresa} = req.body;
    const cliente = new Cliente({
        nombre: nombre,
        edad: edad,
        telefono: telefono,
        empresa: empresa
    });
    await cliente.save();
    res.json({
        status: 'clientes guardado'
    });
});

router.put('/:id', async (req, res) => {
    const {nombre, edad, telefono, empresa} = req.body;
    const clienteNuevo = {
        nombre: nombre,
        edad: edad,
        telefono: telefono,
        empresa: empresa
    }
    await Cliente.findByIdAndUpdate(req.params.id, clienteNuevo, {useFindAndModify: false});
    res.json({
        status: 'Cliente actualizado'
    });
});

router.delete('/:id', async (req, res) => {
    await Cliente.findByIdAndRemove(req.params.id, {useFindAndModify: false});
    res.json({
        status: 'Cliente eliminado'
    });
});

module.exports = router;