import { Schema, model, models } from "mongoose"

const playerSchema = new Schema({

    playerName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
    }

})

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
    },
    players: [playerSchema],
    captainName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});

const Team = models.Team || model("Team", teamSchema);
export default Team