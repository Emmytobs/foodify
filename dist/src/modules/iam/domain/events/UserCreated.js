"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreated = void 0;
const IDomainEvent_1 = require("../../../../shared/domain/events/IDomainEvent");
class UserCreated extends IDomainEvent_1.IDomainEvent {
    constructor(user) {
        super();
        this.dateTimeOccured = new Date();
        this.user = user;
    }
    getAggregateId() {
        return this.user.id;
    }
}
exports.UserCreated = UserCreated;
