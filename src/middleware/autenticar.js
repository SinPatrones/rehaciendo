module.exports = {
    VerificarToken(req, res, next) {
        const tokenBrowser = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.inventarioauth;
        console.log("TOKEN ", tokenBrowser);
        if (tokenBrowser !== undefined){
            // VALIDAR SI EL TOKEN AUN SIRVE
            const JWT = require('jsonwebtoken');

            // *-*-* VALOR DE NUESTRA CLAVE SECRETA *-*-*
            let JWT_PASS_SECRET = "";

            if (process.env.JWT_PASS_SERVER) {
                JWT_PASS_SECRET = process.env.JWT_PASS_SERVER;
            } else {
                JWT_PASS_SECRET = "%%-M1P0d3r0s4Cl4v3-%%";
            }
            // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
            JWT.verify(
                tokenBrowser,
                JWT_PASS_SECRET,
                (err, decoded) => {
                    if (err){
                        res.redirect('/panel/ingresar');
                    }else{ // SI EL TOKEN FUE DECIFRADO CON NORMALIDAD
                        req.datatoken = decoded;
                        next();
                    }
                }
            );
        }else{
            res.redirect('/panel/ingresar');
        }

    }
};