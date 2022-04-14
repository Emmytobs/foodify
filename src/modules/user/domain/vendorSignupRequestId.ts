import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";

export class VendorSignupRequestId extends Entity<any> {

    constructor(id: UniqueEntityID) {
        super(null, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    static create(id: UniqueEntityID): Result<VendorSignupRequestId> {
        return Result.ok(new VendorSignupRequestId(id));
    }
}