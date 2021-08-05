import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import UniqueEntityID from "../../../../shared/domain/UniqueEntityID";
import { User } from "../user";

export class UserCreated extends IDomainEvent {
    dateTimeOccured: Date
    user: User

    constructor(user: User) {
        super();
        this.dateTimeOccured = new Date();
        this.user = user
    }

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}