abstract class BaseController {
    execute(req, res) {
        this.executeImpl(req, res)
    }
    abstract executeImpl(req, res)

    jsonResponse(
        res,
        status,
        data?
    ) {
        return res.status(status).json(data)
    }

    ok(res, message, data?) {
        this.jsonResponse(res, 200, data);
    }

    created(res, message, data?) {
        this.jsonResponse(res, 201, data);
    }

    clientError(res, message, data?) {
        this.jsonResponse(res, 401, data);
    }
    
    notFound(res, message, data?) {
        this.jsonResponse(res, 404, data);
    }
    
    unauthorized(res, message, data?) {
        this.jsonResponse(res, 401, data);
    }
    
    forbidden(res, message, data?) {
        this.jsonResponse(res, 403, data);
    }
    
    fail(res, message) {
        this.jsonResponse(res, 500);
    }
}

export default BaseController