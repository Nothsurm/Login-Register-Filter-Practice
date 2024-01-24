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
        const name = req.query.name || ''
        const price = req.query.price || ''

        const listing = await Listing.find({
            name: {$regex: name, $options: 'i'},
            price
        })
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}