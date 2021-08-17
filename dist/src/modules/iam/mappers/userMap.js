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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
var user_1 = require("../domain/user");
var userEmail_1 = require("../domain/userEmail");
var userName_1 = require("../domain/userName");
var userPassword_1 = require("../domain/userPassword");
var UserMap = /** @class */ (function () {
    function UserMap() {
    }
    // static toDTO() {
    // }
    UserMap.toDomain = function (user) {
        var _a;
        var emailOrError = userEmail_1.UserEmail.create(user.email);
        var passwordOrError = userPassword_1.UserPassword.create({ value: user.password, hashed: true });
        var usernameOrError = userName_1.UserName.create({ value: user.username });
        var userOrError = user_1.User.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
            firstname: user.firstname,
            roles: user.roles,
            username: usernameOrError.getValue()
        });
        if (userOrError.isFailure) {
            // If it's a failed result, throw an error
            throw new Error((_a = userOrError.error) === null || _a === void 0 ? void 0 : _a.toString());
        }
        return userOrError.getValue();
    };
    UserMap.toPersistence = function (user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!user.password.isHashed()) return [3 /*break*/, 1];
                        password = user.password.value;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, user.password.getHashedValue()];
                    case 2:
                        password = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, {
                            userId: user.userId.id.toString(),
                            firstname: user.firstname,
                            lastname: user.lastname,
                            username: (_a = user.username) === null || _a === void 0 ? void 0 : _a.value,
                            email: user.email.value,
                            password: password,
                            is_email_verified: user.isEmailVerified
                        }];
                }
            });
        });
    };
    return UserMap;
}());
exports.UserMap = UserMap;
