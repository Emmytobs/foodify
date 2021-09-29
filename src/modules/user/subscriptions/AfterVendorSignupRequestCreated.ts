import { IHandle } from "../../../shared/domain/events/IHandle";
import { VendorSignupRequestCreated } from "../domain/events/VendorSignupRequestCreated";

export class AfterVendorSignupRequestCreated implements IHandle {
    constructor(
        // Insert usecases here
    ) {
        this.setupSubscription()
    }

    setupSubscription() {
        // Register domain event
    }

    onVendorSignupRequestCreated(event: VendorSignupRequestCreated) {
        const { vendorSignupRequest } = event;
        // 1. Send email to the vendor acknoledging the sign up request
    }
}