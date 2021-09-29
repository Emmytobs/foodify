"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueEntityID_1 = __importDefault(require("./UniqueEntityID"));
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    constructor(props, id) {
        this.props = props;
        this._id = id ? id : new UniqueEntityID_1.default();
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
}
exports.Entity = Entity;
