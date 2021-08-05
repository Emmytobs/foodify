import { DomainEvent } from "../../../shared/domain/events/DomainEvent";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UserCreated } from "../domain/events/UserCreated";

export class AfterUserCreated implements IHandle<IDomainEvent> {
    constructor(
        // Inject use cases
    ) {
        this.setupSubscription()
    }

    setupSubscription() {
        DomainEvent.register(this.onUserCreated.bind(this), UserCreated.name);
    }

    onUserCreated(event: UserCreated) {
        // Do stuff here when a user is created
    }
}