"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Identifier = /** @class */ (function () {
    function Identifier(value) {
        this.value = value;
        this.value = value;
    }
    Identifier.prototype.equals = function (id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    };
    Identifier.prototype.toString = function () {
        return String(this.value);
    };
    /**
     * Return raw value of identifier
     */
    Identifier.prototype.toValue = function () {
        return this.value;
    };
    return Identifier;
}());
exports.default = Identifier;
