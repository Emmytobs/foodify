"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodPriceDiscounted = void 0;
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class FoodPriceDiscounted extends ValueObject_1.ValueObject {
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
        return Result_1.Result.ok(new FoodPriceDiscounted(props));
    }
    static isValid(price) {
        return true;
    }
}
exports.FoodPriceDiscounted = FoodPriceDiscounted;
