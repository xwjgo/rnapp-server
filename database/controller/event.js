'use strict';

const Event = require('../models/event');
/**
 * 用户事件控制器
 * @class EventCtl
 */
class EventCtl {
    static createOneEvent (eventObj, callback) {
        const newEvent = new Event(eventObj);
        newEvent.save(callback);
    }

    static getEventsByQuery (query, callback) {
        Event.find(query, callback);
    }
}

module.exports = EventCtl;
