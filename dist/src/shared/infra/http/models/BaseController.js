"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.execute = function (req, res) {
        this.executeImpl(req, res);
    };
    BaseController.prototype.jsonResponse = function (res, status, data) {
        return res.status(status).json(data);
    };
    BaseController.prototype.ok = function (res, data) {
        this.jsonResponse(res, 200, data);
    };
    BaseController.prototype.created = function (res, data) {
        this.jsonResponse(res, 201, data);
    };
    BaseController.prototype.clientError = function (res, data) {
        this.jsonResponse(res, 401, data);
    };
    BaseController.prototype.notFound = function (res, data) {
        this.jsonResponse(res, 404, data);
    };
    BaseController.prototype.unauthorized = function (res, data) {
        this.jsonResponse(res, 401, data);
    };
    BaseController.prototype.forbidden = function (res, data) {
        this.jsonResponse(res, 403, data);
    };
    BaseController.prototype.fail = function (res) {
        this.jsonResponse(res, 500);
    };
    return BaseController;
}());
exports.default = BaseController;
