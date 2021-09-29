import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

export class FoodId extends Entity<any> {
    get id() {
        return this._id;
    }

    constructor(id?: UniqueEntityID) {
        super(null, id)
    }

    static create(id: UniqueEntityID): Result<FoodId> {
        return Result.ok<FoodId>(new FoodId(id))
    }
}