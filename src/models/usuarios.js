const conexion = require('../config/connection');
const Tools = require('../lib/tools');

class Usuarios{
    constructor(nuevousuario) {
        this.usuario = nuevousuario.usuario;
        this.clave = Tools.hashear(nuevousuario.clave);
        this.nombres = nuevousuario.nombres;
        this.apellidos = nuevousuario.apellidos;
        this.tipodeusuario = nuevousuario.tipodeusuario;
    }

    static crearUsuario({usuario, clave, nombres, apellidos, tipodeusuario}, result){
        conexion.query(
            "INSERT usuarios(usuario,clave,nombres,apellidos,tipousuario) VALUES(?,?,?,?,?)",
            [usuario, clave, nombres, apellidos, tipodeusuario],
            (err, res) => {
                if (err) {
                    result(err, null);
                }else {
                    result(null, res);
                }
            });
    }

    static obtenerUsuario(usuario, result){
        conexion.query(
            "SELECT * FROM usuarios WHERE usuario=?",
            [usuario],
            (err, res)=>{
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static obtenerUsuarios(result){
        connection.query(
            "SELECT usuarios.*,usuarios.usuarios FROM usuarios INNER JOIN usuarios ON usuarios.idusuario=usuarios.idusuario",
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


module.exports = Usuarios;