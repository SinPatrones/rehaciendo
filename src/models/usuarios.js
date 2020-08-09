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
        conexion.query(
            "SELECT * FROM usuarios",
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static editarUsuario(actualizarUsuario, result){
        let cadena = "";
        let datos = [];
        if (actualizarUsuario.clave){
            cadena = "UPDATE usuarios SET usuario=?,clave=?,nombres=?,apellidos=? WHERE idusuario=?";
            datos = [actualizarUsuario.usuario,Tools.hashear(actualizarUsuario.clave),actualizarUsuario.nombres,actualizarUsuario.apellido,actualizarUsuario.idusuario];
        }else{
            cadena = "UPDATE usuarios SET usuario=?,nombres=?,apellidos=? WHERE idusuario=?";
            datos = [actualizarUsuario.usuario,actualizarUsuario.nombres,actualizarUsuario.apellidos,actualizarUsuario.idusuario];
        }
        conexion.query(
            cadena,
            datos,
            (err, res) => {
                if (err){
                    result(err, null);
                }else{
                    result(null, res);
                }
            }
        );
    }

    static obtenerUsuarioPorId(idUsuario, result){
        conexion.query(
            "SELECT * FROM usuarios WHERE idusuario=?",
            [idUsuario],
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