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

export const getListings = async (req, res, next) => {
    try {
        const listing = await Listing.find({})
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}