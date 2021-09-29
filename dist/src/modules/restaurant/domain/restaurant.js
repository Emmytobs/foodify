"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const userId_1 = require("../../iam/domain/userId");
const restaurantId_1 = require("./restaurantId");
const vendorId_1 = require("./vendorId");
class Restaurant extends AggregateRoot_1.AggregateRoot {
    get restaurantId() {
        return restaurantId_1.RestaurantId.create().getValue();
    }
    get userId() {
        return userId_1.UserId.create().getValue();
    }
    get vendorId() {
        return vendorId_1.VendorId.create().getValue();
    }
    get food() { return this.props.food; }
    get rating() { return this.props.rating; }
    get verificationStatus() { return this.props.verificationStatus; }
    get isActive() { return this.props.isActive; }
    get isVerified() { return this.props.isVerified; }
    constructor(props, id) {
        super(props, id);
    }
    static create(restaurant) {
        // A restaurant must have a user id and vendor id
    }
}
exports.Restaurant = Restaurant;
