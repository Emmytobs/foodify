"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
var Result_1 = require("../../../shared/core/Result");
var Entity_1 = require("../../../shared/domain/Entity");
var UserId = /** @class */ (function (_super) {
    __extends(UserId, _super);
    function UserId(id) {
        return _super.call(this, null, id) || this;
    }
    Object.defineProperty(UserId.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    ;
    UserId.create = function (id) {
        return Result_1.Result.ok(new UserId(id));
    };
    return UserId;
}(Entity_1.Entity));
exports.UserId = UserId;
