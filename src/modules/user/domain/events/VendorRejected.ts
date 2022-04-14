import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { VendorSignupRequest } from "../vendorSignupRequest";

export class VendorRejected extends IDomainEvent {
    dateTimeOccured: Date
    vendorSignupRequest: VendorSignupRequest

    constructor (vendorSignupRequest: VendorSignupRequest) {
        super();
        this.dateTimeOccured = new Date();
        this.vendorSignupRequest = vendorSignupRequest
    }
    
    getAggregateId() {
        return this.vendorSignupRequest.id
    }
}