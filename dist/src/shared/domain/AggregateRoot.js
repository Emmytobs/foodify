"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
const DomainEvent_1 = require("./events/DomainEvent");
class AggregateRoot extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
        // private logDomainEventAdded(domainEvent: IDomainEvent) {
        //     const thisClass = Reflect.getPrototypeOf(this);
        //     const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        //     if (thisClass && domainEventClass) {
        //         console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
        //     }
        // }
    }
    get id() {
        return this._id;
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        DomainEvent_1.DomainEvent.markAggregateForDispatch(this);
    }
    clearEvents() {
        this._domainEvents.slice(0, this._domainEvents.length);
    }
}
exports.AggregateRoot = AggregateRoot;
