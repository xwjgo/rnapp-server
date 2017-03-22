'use strict';

const mongoose = require('mongoose');
const settings = require('../settings');

let instance = null;

/**
 * 数据连接
 */
class Database {
    constructor () {
        this._db = null;
    }

    get db () {
        return this._db || (this._db = this._createDbConnection());
    }

    /**
     * 创建MongoDB连接
     * @private
     */
    _createDbConnection () {
        const db = mongoose.connect(settings.db).connection;
        db.on('error', (err) => {
            console.error(err.stack);
        });
        return db;
    }
}

module.exports = instance || (instance = new Database().db);
