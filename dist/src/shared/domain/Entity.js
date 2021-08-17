"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var UniqueEntityID_1 = __importDefault(require("./UniqueEntityID"));
var isEntity = function (v) {
    return v instanceof Entity;
};
var Entity = /** @class */ (function () {
    function Entity(props, id) {
        this.props = props;
        this._id = id ? id : new UniqueEntityID_1.default();
    }
    Entity.prototype.equals = function (object) {
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
    };
    return Entity;
}());
exports.Entity = Entity;
