import UniqueEntityID from "../UniqueEntityID";

export abstract class IDomainEvent {
    abstract dateTimeOccured: Date;
    abstract getAggregateId(): UniqueEntityID
}