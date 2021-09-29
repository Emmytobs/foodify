"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    execute(req, res) {
        this.executeImpl(req, res);
    }
    jsonResponse(res, status, data) {
        return res.status(status).json(data);
    }
    ok(res, data, message) {
        this.jsonResponse(res, 200, {
            status: 'success',
            data,
            message
        });
    }
    created(res, data, message) {
        this.jsonResponse(res, 201, {
            status: 'success',
            data,
            message
        });
    }
    conflict(res, data, message) {
        this.jsonResponse(res, 409, {
            status: 'error',
            data,
            message: message || 'Conflict'
        });
    }
    clientError(res, data, message) {
        this.jsonResponse(res, 400, {
            status: 'error',
            data,
            message
        });
    }
    notFound(res, data, message) {
        this.jsonResponse(res, 404, {
            status: 'error',
            data,
            message
        });
    }
    unauthorized(res, data, message) {
        this.jsonResponse(res, 401, {
            status: 'error',
            data,
            message
        });
    }
    forbidden(res, data, message) {
        this.jsonResponse(res, 403, {
            status: 'error',
            data,
            message
        });
    }
    fail(res, message) {
        this.jsonResponse(res, 500, {
            status: 'error',
            message: message || 'Unexpected error'
        });
    }
}
exports.default = BaseController;
