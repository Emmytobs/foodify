import express from 'express';

export const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is active',
        data: {
            // You may put other things about the API here
            version: '1'
        }
    })
})