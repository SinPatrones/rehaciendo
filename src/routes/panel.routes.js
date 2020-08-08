const express = require('express');
const router = express.Router();

const Usuarios = require('../controllers/usuarios.controller');
const TiposDeBienes = require('../controllers/panel.controller');
const Bienes = require('../controllers/bienes.controllar');

const { VerificarToken } = require('../middleware/autenticar');

router.get('/', VerificarToken,(req, res) => {
    res.render('panel/index', {status: "", msg: req.datatoken, token: req.datatoken});
});

router.get('/mostrarinventario', VerificarToken, Bienes.obtenerBienes);

router.get('/registrarbien', VerificarToken, TiposDeBienes.obtenerLista);
router.post('/registrarbien', VerificarToken, Bienes.crearBien);
router.get('/editarbien/:idbien', VerificarToken, Bienes.obtenerBienPorId);
router.get('/eliminarbien/:idbien', VerificarToken, Bienes.eliminarBienPorId);
router.get('/buscarbien', VerificarToken, Bienes.buscarBienes);
router.get('/buscarbien/:idcategoria/:nombrebien', VerificarToken, Bienes.buscatBienesPorNombre);

router.get('/crearusuario', VerificarToken, (req, res) =>{
    res.render('panel/registrarusuario', {status: "", msg: "", token: req.datatoken});
});

router.post('/crearusuario', VerificarToken, Usuarios.crearAdministrador);

router.get('/ingresar', (req, res) => {
   res.render('panel/ingresar', {status: '', msg: '', token: req.datatoken});
});

router.post('/ingresar', Usuarios.ingresarAdministrador);

router.get('/salir', (req, res) => {
    res.cookie('inventarioauth', '', {
        maxAge: new Date(Date.now() - 1000),
        //httpOnly: true
    });
    res.redirect('/panel/ingresar');
});
module.exports = router;
