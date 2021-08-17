"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var v1_1 = require("./src/shared/infra/http/api/v1");
exports.app = express_1.default();
exports.app.use('api/v1', v1_1.v1Router);
var PORT = process.env.NODE_ENV;
exports.app.listen(PORT, function () {
    console.log('Server Running');
});
