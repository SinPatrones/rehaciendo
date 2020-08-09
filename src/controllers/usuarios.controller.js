const Usuarios = require('../models/usuarios');

exports.crearAdministrador = (req, res) => {
    const nuevoUsuario = new Usuarios(req.body);

    Usuarios.crearUsuario(nuevoUsuario, (err, result) => {
        if (err){
            console.log("ERROR AL REGISTRAR", err);
            res.render('panel/registrarusuario', {status: "error", msg: "Error al registrar administrador"});
        }else{
            res.render('panel/registrarusuario', {status: "ok", msg: "Administrador registrado con éxito"});
        }
    });
};

exports.ingresarAdministrador = (req, res) => {
    console.log("FOMRULARIO", req.body);
    Usuarios.obtenerUsuario(req.body.usuario, (err, result) => {
        if (err){
            res.render('panel/ingresar', {status: 'error', msg: "ERROR EN SISTEMA"});
        }else{
            if (result.length < 1){
                res.render('panel/ingresar', {status: 'error', msg: "Usuario no encontrado"});
            }else{
                const Tools = require('../lib/tools');
                if (Tools.compararhash(req.body.clave, result[0].clave)){
                    const JWT = require('jsonwebtoken');
                    const dataToken = {
                        idusuario: result[0].idusuario,
                        usuario:result[0].usuario,
                        nombres:result[0].nombres,
                        apellido:result[0].apellido,
                        tipousuario: result[0].tipousuario,
                        horalogueo: new Date()
                    }; // -----------------
                    let JWT_PASS_SECRET = "";

                    if (process.env.JWT_PASS_SERVER) {
                        JWT_PASS_SECRET = process.env.JWT_PASS_SERVER;
                    } else {
                        JWT_PASS_SECRET = "%%-M1P0d3r0s4Cl4v3-%%";
                    }

                    let dieTime = {
                        expiresIn: '24h'
                    };

                    const MiToken = JWT.sign(
                        dataToken,
                        JWT_PASS_SECRET,
                        dieTime
                    );

                    console.log("GUARDANDO COOKIE EN NAVEGADOR");
                    res.cookie('inventarioauth', MiToken, {
                        maxAge: new Date(Date.now() + 3600000),
                        //httpOnly: true
                    });

                    res.redirect('/panel');
                }else{
                    res.render('panel/ingresar', {status: 'error', msg: "Clave incorrecta"});
                }}
        }
    });
};

exports.obtenerUsuarios = (req, res) => {
    console.log("TOKEN:", req.datatoken);
    Usuarios.obtenerUsuarios((err, result) => {
        if (err){
            res.render('panel/mostrarusuarios', {status: "error", msg: 'Error al obtener lista de usuarios', listaDeUsuarios: [], token: req.datatoken});
        }else{
            res.render('panel/mostrarusuarios', {status: "ok", msg: 'Lista de usuarios recuperada', listaDeUsuarios: result, token: req.datatoken});
        }
    });
};

exports.editarusuario = (req, res) => {
    let sinclave = false;
    if (req.body.clave === ""){
        sinclave = true;
    }
    let editar = new Usuarios(req.body);
    console.log("FORMULARIO:", req.body);
    editar.clave = sinclave?"":editar.clave;
    editar.idusuario = req.params.idusuario;
    console.log("NUEVO USUARIO:", editar);

    Usuarios.editarUsuario(editar, sinclave, (err, result) => {
        if (err){
            console.log("ERROR AL EDITAR USUARIO", err);
            res.render('panel/editarusuario', {status: "error", msg: "Error al actualizar datos", token: req.datatoken, usuario: [editar]});
        }else{
            res.render('panel/editarusuario', {status: "ok", msg: "Administrador editado con éxito", token: req.datatoken, usuario: [editar]});
        }
    });
};

exports.obtenerUsuario = (req, res) => {
    Usuarios.obtenerUsuarioPorId(req.params.idusuario, (err, result) => {
        if (err){
            res.render('panel/editarusuario', {status: "error", msg: "Error al actualizar datos", token: req.datatoken, usuario: []});
        }else {
            console.log("DATOS USUARIO:", result);
            res.render('panel/editarusuario', {status: "", msg: "", token: req.datatoken, usuario: result});
        }
    });
};