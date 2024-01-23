import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

const Listing = mongoose.model('Listing', listingSchema)

export default Listing;