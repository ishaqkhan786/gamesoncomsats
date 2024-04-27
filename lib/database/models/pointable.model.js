
import { Schema, model, models } from "mongoose";

const PointableSchema = new Schema({

    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event', // Assuming you have an Event model
        required: true
    },
   teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team', // Assuming you have a Team model
        required: true
    },
    matchesPlayed: {
        type: Number,
        default: 0
    },
    matchesWon: {
        type: Number,
        default: 0
    },
    matchesLost: {
        type: Number,
        default: 0
    },
    matchesDrawn: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    }
});


export default models.Pointable || model("Pointable", PointableSchema);
