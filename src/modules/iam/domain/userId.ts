import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

export class UserId extends Entity<any> {
    get id(): UniqueEntityID {
        return this._id;
    }

    constructor(id?: UniqueEntityID) {
        super(null, id);
    };

    public static create(id?: UniqueEntityID) {
        return Result.ok<UserId>(new UserId(id));
    }
}