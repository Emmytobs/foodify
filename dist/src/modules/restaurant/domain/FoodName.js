"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodName = void 0;
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class FoodName extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!this.isValid) {
            return Result_1.Result.fail('');
        }
        return Result_1.Result.ok(new FoodName(props));
    }
    static isValid(name) {
        return true;
    }
}
exports.FoodName = FoodName;
