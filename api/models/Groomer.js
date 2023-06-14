import mongoose from 'mongoose';

const GroomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    images: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    minFee: {
        type: Number,
        required: true
    },
    services: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model("Groomers", GroomerSchema)