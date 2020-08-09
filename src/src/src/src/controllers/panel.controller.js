const TipoDeBien = require('../models/tiposdebienes');

exports.obtenerLista = (req, res) => {
    TipoDeBien.obtenerLista((err, result) => {
        if (err){

        }else{
            res.render('panel/registrarbien', {status: "", msg: "", token: req.datatoken, tipoDeBienes: result});
        }
    });
};