import express from 'express';
import { createVendorSignupRequestController } from '../../../useCases/createVendorSignupRequest';

export const vendorRoutes = express.Router();

vendorRoutes.post(
    '/signup-request',
    (req, res) => createVendorSignupRequestController.execute(req, res)
)