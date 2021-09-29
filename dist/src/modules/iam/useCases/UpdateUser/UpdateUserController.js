"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const BaseController_1 = __importDefault(require("../../../../shared/infra/http/models/BaseController"));
class UpdateUserController extends BaseController_1.default {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    executeImpl(req, res) {
        const dto = req.body;
        const result = this.useCase.execute(dto);
        console.log(result);
        this.ok(res);
    }
}
exports.UpdateUserController = UpdateUserController;
