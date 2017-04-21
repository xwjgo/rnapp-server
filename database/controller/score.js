'use strict';

const Score = require('../models/score');

class scoreCtl {
    static createOneScore (score, callback) {
        const newScore = new Score(score);
        newScore.save(callback);
    }

    static findScoresByQuery (query, callback) {
        Score.find(query, callback);
    }
}

module.exports = scoreCtl;