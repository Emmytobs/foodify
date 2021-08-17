"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
// @ts-nocheck
var express_1 = __importDefault(require("express"));
var iam_route_1 = require("../../../../modules/iam/infra/http/routes/iam.route");
exports.v1Router = express_1.default.Router();
exports.v1Router.get('/', function (req, res) {
    res.status(200).json({
        message: 'API is active',
        data: {
            // You may put other things about the API here
            version: '1'
        }
    });
});
exports.v1Router.use('/user', iam_route_1.iamRoutes);
