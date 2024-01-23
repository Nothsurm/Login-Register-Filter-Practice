import express from 'express';
import { createListing, getAllListings } from '../controller/listingController.js';
//import { generateToken } from '../utils/createToken.js'

const router = express.Router()

router.post('/create', createListing)
router.get('/get', getAllListings)

export default router;