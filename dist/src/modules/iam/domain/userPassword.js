"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
class UserPassword extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    static create(props) {
        if (!this.isAppropriateLength(props.value)) {
            return Result_1.Result.fail(`Password must be greater than ${this.minimumLength} characters`);
        }
        return Result_1.Result.ok(new UserPassword(props));
    }
    isHashed() {
        return !!this.props.hashed;
    }
    getHashedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isHashed())
                return this.props.value;
            return this.hashPassword(this.props.value);
        });
    }
    comparePassword(plainTextPassword, savedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bcryptCompare(plainTextPassword, savedPassword);
            // if (this.isHashed) {
            //     const hashed = this.props.value
            //     return this.bcryptCompare(plainTextPassword, hashed)
            // }
            // return this.props.value === plainTextPassword;
        });
    }
    static isAppropriateLength(password) {
        const isOfMinimumLength = password.length >= this.minimumLength;
        return !!isOfMinimumLength;
    }
    bcryptCompare(plainTextPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainTextPassword, hashedPassword);
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 6);
            return hashedPassword;
        });
    }
}
exports.UserPassword = UserPassword;
UserPassword.minimumLength = 8;
