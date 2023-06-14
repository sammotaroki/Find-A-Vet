import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
}, { timestamps: true });


export default mongoose.model("Room", RoomSchema)



