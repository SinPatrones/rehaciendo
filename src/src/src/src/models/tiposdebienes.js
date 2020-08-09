const conexion = require('../config/connection');

class TiposDeBienes{
    constructor(nuevoBien) {
        this.nombre = nuevoBien.nombre;
    }

    static obtenerLista(result){
        conexion.query(
            "SELECT * FROM tiposdebienes",
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }
}

module.exports = TiposDeBienes;