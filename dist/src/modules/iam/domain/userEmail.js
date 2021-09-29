"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const Result_1 = require("../../../shared/core/Result");
const Entity_1 = require("../../../shared/domain/Entity");
class UserEmail extends Entity_1.Entity {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        if (!this.isValidEmail(props.value)) {
            return Result_1.Result.fail('Email address is invalid');
        }
        return Result_1.Result.ok(new UserEmail({ value: this.formatEmail(props.value) }));
    }
    static isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    static formatEmail(email) {
        return email.trim().toLowerCase();
    }
}
exports.UserEmail = UserEmail;
