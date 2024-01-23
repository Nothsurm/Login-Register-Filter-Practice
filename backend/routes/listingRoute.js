import express from 'express';
import { createListing } from '../controller/listingController.js';
//import { generateToken } from '../utils/createToken.js'

const router = express.Router()

router.post('/create', createListing)

export default router;