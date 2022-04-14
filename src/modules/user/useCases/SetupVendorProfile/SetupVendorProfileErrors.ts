import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class VendorSignupRequestNotFound extends Result<UseCaseError> {
    constructor(vendorSignupRequestId: string) {
        super(
            false, {
                message: `No vendorSignupRequest found with id: ${vendorSignupRequestId}`
            } as UseCaseError
        )
    }
}

export class UserDoesntExistWithVendorEmail extends Result<UseCaseError> {
    constructor() {
        super(
            false, {
                message: "No user exists with the vendor's email"
            }
        )
    }
}

export class UserPasswordInvalid extends Result<UseCaseError> {
    constructor(message: string) {
        super(
            false, {
                message
            }
        )
    }
}