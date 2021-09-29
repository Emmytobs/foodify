"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserName = void 0;
const Guard_1 = require("../../../shared/core/Guard");
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
class UserName extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get value() {
        return this.props.value;
    }
    static create(props) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'username');
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message || '');
        }
        const hasMinimumChars = Guard_1.Guard.againstAtLeast(this.MIN_CHARACTERS_IN_USERNAME, props.value);
        if (!hasMinimumChars) {
            return Result_1.Result.fail(`Username must be at least ${this.MIN_CHARACTERS_IN_USERNAME} characters`);
        }
        ;
        return Result_1.Result.ok(new UserName({ value: props.value }));
    }
}
exports.UserName = UserName;
UserName.MIN_CHARACTERS_IN_USERNAME = 3;
