"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterUserCreated = void 0;
const DomainEvent_1 = require("../../../shared/domain/events/DomainEvent");
const UserCreated_1 = require("../domain/events/UserCreated");
class AfterUserCreated {
    constructor(
    // Inject use cases
    ) {
        this.setupSubscription();
    }
    setupSubscription() {
        DomainEvent_1.DomainEvent.register(this.onUserCreated.bind(this), UserCreated_1.UserCreated.name);
    }
    onUserCreated(event) {
        console.log(event);
        // Do stuff here when a user is created
    }
}
exports.AfterUserCreated = AfterUserCreated;
