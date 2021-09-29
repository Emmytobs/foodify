"use strict";
// export type UserRoles = 'Vendor' | 'Customer' | 'Worker'
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
;
class UserRoles extends Entity_1.Entity {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!this.isValidRole(props)) {
            return Result_1.Result.fail('User role is invalid');
        }
        return Result_1.Result.ok(new UserRoles(props));
    }
    static isValidRole(roles) {
        for (const role of roles.value) {
            if (role !== 'Customer' &&
                role !== 'Vendor' &&
                role !== 'Worker') {
                return false;
            }
        }
        return true;
    }
}
exports.UserRoles = UserRoles;
