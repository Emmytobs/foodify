import { Entity } from "./Entity";
import { DomainEvent } from "./events/DomainEvent";
import { IDomainEvent } from "./events/IDomainEvent";

export class AggregateRoot<A> extends Entity<A> {
    private _domainEvents: IDomainEvent[] = [];

    get id() {
        return this._id;
    }

    get domainEvents() {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent) {
        this._domainEvents.push(domainEvent)
        DomainEvent.markAggregateForDispatch(this);
    }

    public clearEvents(): void {
        this._domainEvents.slice(0, this._domainEvents.length);
    }

    // private logDomainEventAdded(domainEvent: IDomainEvent) {
    //     const thisClass = Reflect.getPrototypeOf(this);
    //     const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    //     if (thisClass && domainEventClass) {
    //         console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
    //     }
    // }
}