import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

export class VendorId extends Entity<any> {
    get id() {
        return this._id
    }

    private constructor(id: UniqueEntityID) {
        super(null, id)
    }

    public static create(id: UniqueEntityID) {
        return Result.ok<VendorId>(new VendorId(id));
    }
}