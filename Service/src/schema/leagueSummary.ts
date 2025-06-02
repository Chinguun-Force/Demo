import mongoose from 'mongoose';

const LeagueSummarySchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    pointsPerGame: {
        type: Number
    },
    twoPointPercentage: {
        type: Number
    }, // "2FGP%"
    threePointPercentage: {
        type: Number
    }, // "3FGP%"
    freeThrowPercentage: {
        type: Number
    }, // "FT%"

    offensiveRebounds: {
        type: Number
    }, // "Off rebounds"
    defensiveRebounds: {
        type: Number
    }, // "Def rebounds"
    totalRebounds: {
        type: Number
    }, // "Total rebounds"

    assistsPerGame: {
        type: Number
    },
    turnoversPerGame: {
        type: Number
    },
    stealsPerGame: {
        type: Number
    },
    blocksPerGame: {
        type: Number
    },

    opponentPointsPerGame: {
        type: Number
    }, // "Points per game of opponent"
    opponentTwoPointPercentage: {
        type: Number
    },
    opponentThreePointPercentage: {
        type: Number
    }

});

const LeagueSummary = mongoose.model('LeagueSummary', LeagueSummarySchema);

export default LeagueSummary;
