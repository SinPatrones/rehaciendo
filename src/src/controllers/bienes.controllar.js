const Bienes = require('../models/bienes');
const TipoDeBienes = require('../models/tiposdebienes');

exports.crearBien = (req, res) => {
    let nuevoBien = new Bienes(req.body);
    nuevoBien.idcreador = req.datatoken.idusuario;
    nuevoBien.fecharegistro = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();

    console.log("NUEVO ELEMENTO A CREAR:", nuevoBien);
    Bienes.crearBien(nuevoBien, (err, result) => {
        if (err){
            console.log("ERROR AL INSERTAR", err);
            res.render('panel/registrarbien', {status: "error", msg: "Error al registrar un nuevo bien", token: req.datatoken, tipoDeBienes: []});
        }else{
            TipoDeBienes.obtenerLista((errTipoDeBienes, resultTipoDeBienes) => {
                if (errTipoDeBienes){
                    console.log("LISTA BIENES POST(error):", resultTipoDeBienes);
                    res.render('panel/registrarbien', {status: "ok", msg: "Nuevo bien registrado con éxito.", token: req.datatoken, tipoDeBienes: []});
                }else{
                    console.log("LISTA BIENES POST:", resultTipoDeBienes);
                    res.render('panel/registrarbien', {status: "ok", msg: "Nuevo bien registrado con éxito.", token: req.datatoken, tipoDeBienes: resultTipoDeBienes});
                }
            });
        }
    });
};

exports.obtenerBienes = (req, res) => {
    console.log("TOKEN:", req.datatoken);
    Bienes.obtenerBienes((err, result) => {
        if (err){
            res.render('panel/mostrarinventario', {status: "error", msg: 'Error al obtener lista de bienes', listaDeBienes: [], token: req.datatoken});
        }else{
            res.render('panel/mostrarinventario', {status: "ok", msg: 'Lista de bienes recuperada', listaDeBienes: result, token: req.datatoken});
        }
    });
};

exports.obtenerBienPorId = (req, res) => {
    Bienes.obtenerBienPorId(req.params.idbien, (errBien, resultBien) => {
        if (errBien){
            res.render('panel/editarbien', {status: "error", msg: "Error al obtener bien", token: req.datatoken, datosBien: [], tipoDeBienes: []});
        }else {
            TipoDeBienes.obtenerLista((errTipoDeBienes, resultTipoDeBienes) => {
                if (errTipoDeBienes){
                    res.render('panel/editarbien', {status: "error", msg: "No se puede obtener los tipos de bienes registrados", token: req.datatoken, datosBien: resultBien, tipoDeBienes: []});
                }else{
                    res.render('panel/editarbien', {status: "ok", msg: "Datos obtenidos", token: req.datatoken, datosBien: resultBien, tipoDeBienes: resultTipoDeBienes});

                }
            });
        }
    });
};

exports.eliminarBienPorId = (req, res) => {
    res.render('panel/eliminarbien', {datosBien: {id: req.params.idbien}, token: req.datatoken});
};

exports.buscarBienes = (req, res) => {
    Bienes.obtenerBienes((err, result) => {
        if (err){
            res.render('panel/buscarbien', {status: "error", msg: 'Error al obtener lista de bienes', listaDeBienes: [], token: req.datatoken});
        }else{
            res.render('panel/buscarbien', {status: "ok", msg: 'Lista de bienes recuperada', listaDeBienes: result, token: req.datatoken});
        }
    });
};

exports.buscatBienesPorNombre = (req, res) => {
    Bienes.buscarBienPorNombre(req.params.idcategoria, req.params.nombrebien, (err, result) => {
        if (err){
            console.log("ERROR RESULTADO DE BUSQUEDA", err);
            res.render('panel/buscarbien', {status: "error", msg: 'Error al obtener lista de bienes', listaDeBienes: [], token: req.datatoken});
        }else{
            console.log("RESULTADO DE BUSQUEDA", result);
            res.render('panel/buscarbien', {status: "ok", msg: 'Lista de bienes recuperada', listaDeBienes: result, token: req.datatoken});
        }
    })
};