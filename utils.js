const crypto = require('crypto');
const settings = require('./settings');

class Utils {
    /**
     * 用户密码加密
     * @param password
     * @returns {String} - 加密后的密码
     */
    static encryptPassword (password) {
        const hMac = crypto.createHmac(settings.crypto.hash, settings.crypto.secret);
        return hMac.update(password).digest(settings.crypto.encoding);
    }
}

module.exports = Utils;