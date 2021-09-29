"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorId = void 0;
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
class VendorId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
    static create(id) {
        return Result_1.Result.ok(new VendorId(id));
    }
}
exports.VendorId = VendorId;
