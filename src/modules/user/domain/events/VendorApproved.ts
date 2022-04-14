import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { VendorSignupRequest } from "../vendorSignupRequest";

export class VendorApproved extends IDomainEvent {
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