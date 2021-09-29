import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";
import { UserId } from "./userId";
import { VendorId } from "./vendorId";

interface VendorProps {
    userId: UserId
}

export class Vendor extends Entity<VendorProps> {
    
    get vendorId(): VendorId {
        return VendorId.create(this._id).getValue()
    }
    
    get userId(): UserId {
        return this.props.userId
    }

    constructor(props: VendorProps, id?: UniqueEntityID) {
        super(props, id)
    }

    static create(props: VendorProps, id?: UniqueEntityID): Result<Vendor> {
        const guardResult = Guard.againstNullOrUndefined(props.userId, 'userId');
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message || '')
        }
        
        const vendor = new Vendor(props, id)

        return Result.ok<Vendor>(vendor);
    }
}