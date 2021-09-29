import { IHandle } from "../../../shared/domain/events/IHandle";
import { VendorApproved } from "../domain/events/VendorApproved";

export class AfterVendorApproved implements IHandle {
    constructor(
        // Insert usecases here
    ) {
        this.setupSubscription()
    }

    setupSubscription() {
        // Register domain event
    }

    onVendorApproved(event: VendorApproved) {
        const { vendorSignupRequest } = event;
        // 1. Send an email to the vendor with a link for them to setup their vendor profile and fully sign up
    }
}