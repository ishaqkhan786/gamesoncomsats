import { Schema, model, models } from 'mongoose';

const bookingSchema = new Schema({
  bookerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  registraionNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
}, { timestamps: true });

const timeSlotSchema = new Schema({
  slotNumber: {
    type: Number,
    required: true,
  },
  timings: {
    type: String, // You might want to use a specific date/time type based on your needs
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Booked", "Reserved"],
    default: "Available",
  },
  bookings: bookingSchema,

}, { timestamps: true });

const groundSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  preBooking: {
    type: String,
    enum: ["Mandatory", "No"],
    default: "Mandatory"
  },
  sportsType: {
    type: String,
    required: true
  },
  timeAllowed: {
    type: Number,
    required: true,
  },
  timeSchedule: [timeSlotSchema], // Array of time slots
});

// Function to generate timings from 8 am to 5 pm
function generateTimings() {
  const timings = [];
  for (let i = 8; i < 17; i++) {
    timings.push(`${i}:00-${i + 1}:00`);
  }
  return timings;
}

// Prepopulate timeSchedule array with timings from 8 am to 5 pm
groundSchema.pre('save', function (next) {
  const ground = this;
  if (!ground.isModified('timeSchedule')) {
    // Generate timings only if timeSchedule is not already modified
    ground.timeSchedule = generateTimings().map((timing, index) => ({
      slotNumber: index + 1,
      timings: timing,
      status: "Available",
      booking: [],
    }));
  }
  next();
});


const Ground = models.Ground || model("Ground", groundSchema);
export default Ground;