"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
var ValueObject = /** @class */ (function () {
    function ValueObject(props) {
        this.props = props;
    }
    ValueObject.prototype.equals = function (vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    };
    return ValueObject;
}());
exports.ValueObject = ValueObject;
