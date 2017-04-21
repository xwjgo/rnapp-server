'use strict';

const Score = require('../models/score');

class scoreCtl {
    static createOneScore (score, callback) {
        const newScore = new Score(score);
        newScore.save(callback);
    }

    static findScoresBySectionId (sectionId, callback) {
        Score.find({
            section_id: sectionId
        }, callback);
    }
}

module.exports = scoreCtl;