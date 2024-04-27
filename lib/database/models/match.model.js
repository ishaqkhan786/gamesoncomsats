import { Schema, model, models } from "mongoose"

const matchSchema = new Schema({
    isFinished: Boolean,
    teamA: String,
    teamB: String,
    sportsType: String,
    teamAGoal: {
        type: Number,
        default: 0
    },
    teamBGoals: {
        type: Number,
        default: 0
    },
    teamAPoints: {
        type: Number,
        default: 0
    },
    teamBPoints: {
        type: Number,
        default: 0
    },
    teamAScoreData: {
        score: Number,
        wickets: Number,
        overs: Number
    },
    teamBScoreData: {
        score: Number,
        wickets: Number,
        overs: Number
    },
    winningTeam: String,
    teamTurn: String,
},

    { timestamps: true }
)
const Match = models.Match || model("Match", matchSchema);
export default Match