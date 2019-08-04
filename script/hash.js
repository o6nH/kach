const crypto = require('crypto');

const secret = process.env.SECRET || 'SuperSecretSecret';

const hash = (password) => 
    crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');


module.exports = hash;