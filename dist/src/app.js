"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const v1_1 = require("./shared/infra/http/api/v1");
const app = express_1.default();
exports.app = app;
dotenv_1.default.config();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', v1_1.v1Router);
// @ts-ignore
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'URL not found'
    });
});
const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT} in ${env}`);
});
