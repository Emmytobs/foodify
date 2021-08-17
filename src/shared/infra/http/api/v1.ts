// @ts-nocheck
import express from 'express';
import { iamRoutes } from '../../../../modules/iam/infra/http/routes/iam.route';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is active',
        data: {
            // You may put other things about the API here
            version: '1'
        }
    })
})

v1Router.use('/user', iamRoutes)

export { v1Router };