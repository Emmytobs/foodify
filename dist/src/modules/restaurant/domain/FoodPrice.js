"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodPrice = void 0;
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class FoodPrice extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!this.isValid(props.value)) {
            return Result_1.Result.fail('Invalid food price');
        }
        return Result_1.Result.ok(new FoodPrice(props));
    }
    static isValid(price) {
        return true;
    }
}
exports.FoodPrice = FoodPrice;
