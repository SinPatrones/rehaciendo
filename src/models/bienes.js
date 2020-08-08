const connection = require('../config/connection.js');

class Bienes{
    constructor(nuevoBien) {
        this.nombre = nuevoBien.nombre;
        this.descripcion = nuevoBien.descripcion;
        this.cantidad = nuevoBien.cantidad;
        this.ubicacion = nuevoBien.ubicacion;
        this.fecharegistro = nuevoBien.fecharegistro;
        this.idcreador = nuevoBien.idcreador;
        this.idtipo = nuevoBien.idtipo;
    }

    static crearBien(nuevoBien, result){
        connection.query(
            "INSERT INTO bienes(nombre,descripcion,cantidad,ubicacion,fecharegistro,idcreador,idtipo) VALUES(?,?,?,?,?,?,?)",
            [nuevoBien.nombre,nuevoBien.descripcion,nuevoBien.cantidad,nuevoBien.ubicacion,nuevoBien.fecharegistro,nuevoBien.idcreador,nuevoBien.idtipo],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static obtenerBienes(result){
        connection.query(
            "SELECT bienes.*,usuarios.usuario FROM bienes INNER JOIN usuarios ON bienes.idcreador=usuarios.idusuario",
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static obtenerBienPorId(idbien, result){
        connection.query(
            "SELECT * FROM bienes WHERE idbien=?",
            [idbien],
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static buscarBienPorNombre(categoriaBien, nombreBien, result){
        connection.query(
            "SELECT bienes.*,usuarios.usuario FROM bienes INNER JOIN usuarios ON bienes.idcreador=usuarios.idusuario WHERE nombre LIKE '%" + nombreBien + "%'" + (categoriaBien.toString() === "0"? "": "AND idtipo=?"),
            [categoriaBien.toString() !== "0"? categoriaBien:null],
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

module.exports = Bienes;