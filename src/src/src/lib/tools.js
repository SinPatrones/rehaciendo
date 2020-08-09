const bcrypt = require('bcryptjs');

module.exports.hashear = (plaintext) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintext, salt);
};

module.exports.compararhash = (plaintext, hashtext) => {
    return bcrypt.compareSync(plaintext, hashtext);
};
/*
module.exports.today = () => {
    const momentTimezone = require('moment-timezone');
    let date = momentTimezone(new Date()).tz('america/Lima'); // libreria para convertir zona horaria - para cuando este en servidor en la nube.
    console.log(date.format('L'));
    return  date.format('L');
};

module.exports.now = (seconds = true) => {
    const momentTimezone = require('moment-timezone');
    let date = momentTimezone(new Date()).tz('america/Lima'); // libreria para convertir zona horaria - para cuando este en servidor en la nube.
    console.log(date.format('LTS').split(' ')[0]);
    return time = date.format('LTS').split(' ')[0];
};*/