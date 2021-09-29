import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

export class RestaurantId extends Entity<any> {
    get id() {
        return this._id
    }

    constructor(id: UniqueEntityID) {
        super(null, id)
    }

    static create(id: UniqueEntityID): Result<RestaurantId> {
        return Result.ok<RestaurantId>(new RestaurantId(id))
    } 
}