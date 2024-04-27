
import { Schema, model, models } from 'mongoose';

const feedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
   
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

export const Feedback = models.Feedback || model('Feedback', feedbackSchema);