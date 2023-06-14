import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    breed: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model("Pet", PetSchema)



