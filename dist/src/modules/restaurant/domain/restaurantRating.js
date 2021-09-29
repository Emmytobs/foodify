"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRating = void 0;
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class RestaurantRating extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!this.isValid(props.value)) {
            return Result_1.Result.fail('Invalid rating. Rating must be between 0 and 6');
        }
        return Result_1.Result.ok(new RestaurantRating(props));
    }
    static isValid(rating) {
        if (rating < 1 || rating > 5) {
            return false;
        }
        return true;
    }
}
exports.RestaurantRating = RestaurantRating;
