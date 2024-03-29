import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    totalTeams: {
        type: Number,
        required: true,
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }],
    organizer: {
        type: String,
        required: true,
    },
});


const Event = models.Event || model("Event", eventSchema);

export default Event