"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterUserCreated = void 0;
var DomainEvent_1 = require("../../../shared/domain/events/DomainEvent");
var UserCreated_1 = require("../domain/events/UserCreated");
var AfterUserCreated = /** @class */ (function () {
    function AfterUserCreated(
    // Inject use cases
    ) {
        this.setupSubscription();
    }
    AfterUserCreated.prototype.setupSubscription = function () {
        DomainEvent_1.DomainEvent.register(this.onUserCreated.bind(this), UserCreated_1.UserCreated.name);
    };
    AfterUserCreated.prototype.onUserCreated = function (event) {
        // Do stuff here when a user is created
    };
    return AfterUserCreated;
}());
exports.AfterUserCreated = AfterUserCreated;
