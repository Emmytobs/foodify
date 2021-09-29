"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Identifier_1 = __importDefault(require("./Identifier"));
const uuid_1 = require("uuid");
class UniqueEntityID extends Identifier_1.default {
    constructor(id) {
        super(id ? id : uuid_1.v4());
    }
}
exports.default = UniqueEntityID;
