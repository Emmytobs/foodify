"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const iam_route_1 = require("../../../../modules/iam/infra/http/routes/iam.route");
const v1Router = express_1.default.Router();
exports.v1Router = v1Router;
v1Router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is active',
        data: {
            // You may put other things about the API here
            version: '1'
        }
    });
});
v1Router.use('/user', iam_route_1.iamRoutes);
