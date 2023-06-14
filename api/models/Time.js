import mongoose from 'mongoose';

const TimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timePeriods: [{ time: String, unavailableDates: { type: [Date] } }],
}, { timestamps: true });


export default mongoose.model("Time", TimeSchema)
