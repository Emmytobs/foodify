"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodDescription = void 0;
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class FoodDescription extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        return Result_1.Result.ok(new FoodDescription(props));
    }
}
exports.FoodDescription = FoodDescription;
