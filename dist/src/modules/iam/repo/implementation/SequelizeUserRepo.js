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
Object.defineProperty(exports, "__esModule", { value: true });
const userEmail_1 = require("../../domain/userEmail");
const userMap_1 = require("../../mappers/userMap");
class SequelizeUserRepo {
    constructor(models) {
        this.models = models;
    }
    createUser() {
        // Perform operation on persistence technology
    }
    exists(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithEmailInDB = yield this.models.UserModel.findOne({
                where: {
                    email: userEmail instanceof userEmail_1.UserEmail ?
                        userEmail.value :
                        userEmail
                }
            });
            return !!userWithEmailInDB;
        });
    }
    getUserByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawUser = yield this.models.UserModel.findOne({
                where: {
                    username
                }
            });
            if (!rawUser)
                throw new Error('User not found');
            return userMap_1.UserMap.toDomain(rawUser);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawUser = yield this.models.UserModel.findOne({
                where: { email }
            });
            if (!rawUser)
                throw new Error('User not found');
            return userMap_1.UserMap.toDomain(rawUser);
        });
    }
    getUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawUser = yield this.models.UserModel.findOne({
                where: { userId }
            });
            if (!rawUser)
                throw new Error('User not found');
            return userMap_1.UserMap.toDomain(rawUser);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawUser = yield userMap_1.UserMap.toPersistence(user);
            const userExists = yield this.exists(user.email);
            if (userExists) {
                // Update user heres
                return;
            }
            yield this.models.UserModel.create(rawUser);
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.models.UserModel.remove({
                where: { userId }
            });
        });
    }
}
exports.default = SequelizeUserRepo;
/**
 * User.create({ ...userProps });
 * - user is created (new User)
 * - user is saved from repo.
 *  - it is checked
 * - since the user is a new user, it adds a domain event
 */
/**
 * User.create({ ..userProps }, new UniqueEntityID())
 * - user is created (using new User)
 * - since the user is an existing user (because a id was passed in), it does not add a domain event
 */ 
