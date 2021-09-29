import { DomainEvent, RegisterCallback } from "../../../shared/domain/events/DomainEvent";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { UserCreated } from "../domain/events/UserCreated";

export class AfterUserCreated implements IHandle {
    constructor(
        // Inject use cases
    ) {
        this.setupSubscription()
    }

    setupSubscription() {
        DomainEvent.register(this.onUserCreated.bind(this) as RegisterCallback, UserCreated.name);
    }

    onUserCreated(event: UserCreated) {
        console.log('Running UserCreated Event Handler....')
        console.log('User with details was created successfully:')
        console.log(event.user)
        // Do stuff here when a user is created
    }
}