import { errorHandler } from "../middleware/error.js"
import Listing from "../models/listingModel.js"


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const getAllListings = async (req, res, next) => {
    try {
        const listings = await Listing.find({})
        if (!listings) {
            return next(errorHandler(400, 'Listings not found'))
        }
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}