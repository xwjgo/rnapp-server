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

    static findByQueryAndUpdate (query, score, callback) {
        Score.findOneAndUpdate(query, {$set: {score: score}}, {new: true}, callback);
    }
}

module.exports = scoreCtl;