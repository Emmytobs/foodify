import express from 'express';
import { userRouter } from '../../../../modules/user/infra/http/routes/userRoutes';
import { restaurantRouter } from '../../../../modules/restaurant/infra/http/routes/restaurantRoutes';
import { vendorRoutes } from '../../../../modules/user/infra/http/routes/vendorRoutes';

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

v1Router.use('/users', userRouter)
v1Router.use('/vendors', vendorRoutes)

v1Router.use('/restaurants', restaurantRouter)

export { v1Router };