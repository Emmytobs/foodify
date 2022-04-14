import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Entity } from "../../../shared/domain/Entity";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";
import { UserEmail } from "./userEmail";
import { UserId } from "./userId";
import { VendorApproved } from "./events/VendorApproved";
import { VendorRejected } from "./events/VendorRejected";
import { VendorSignupRequestCreated } from "./events/VendorSignupRequestCreated";
import { VendorSignupRequestId } from "./vendorSignupRequestId";
import { VendorVerificationStatus } from "./vendorVerificationStatus";

interface VendorSignupRequestProps {
    vendorFirstname: string,
    vendorLastname: string,
    vendorEmail: UserEmail,
    restaurantName: string,
    restaurantAddress: string,
    restaurantCity: string,
    vendorVerificationStatus?: VendorVerificationStatus
}

export class VendorSignupRequest extends AggregateRoot<VendorSignupRequestProps> {
    constructor(props: VendorSignupRequestProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get vendorSignupRequestId(): VendorSignupRequestId {
        return VendorSignupRequestId.create(this._id).getValue()
    }
    get vendorFirstname(): string { return this.props.vendorFirstname }
    get vendorLastname(): string { return this.props.vendorLastname }
    get vendorEmail(): UserEmail { return this.props.vendorEmail }
    get restaurantName(): string { return this.props.restaurantName }
    get restaurantAddress(): string { return this.props.restaurantAddress }
    get restaurantCity(): string { return this.props.restaurantCity }
    get vendorVerificationStatus(): VendorVerificationStatus { 
        return this.props.vendorVerificationStatus as VendorVerificationStatus 
    }

    approveVendor() {
        this.props.vendorVerificationStatus = 'APPROVED'
        // Add domain event here
        this.addDomainEvent(new VendorApproved(this));
    }
    rejectVendor() {
        this.props.vendorVerificationStatus = 'REJECTED'
        // Add domain event here
        this.addDomainEvent(new VendorRejected(this));
    }

    updateVerificationStatus(status: VendorVerificationStatus) {
        if (status === "APPROVED" || status === "REJECTED") {
            throw new Error('[Error]: Use appropriate method on domain object to reject or approve vendor')
        }
        this.props.vendorVerificationStatus = status
    }

    static create(props: VendorSignupRequestProps, id?: UniqueEntityID): Result<VendorSignupRequest> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.vendorFirstname, argumentName: 'vendorFirstname' },
            { argument: props.vendorLastname, argumentName: 'vendorLastname' },
            { argument: props.vendorEmail, argumentName: 'vendorEmail' },
            { argument: props.restaurantName, argumentName: 'restaurantName' },
            { argument: props.restaurantAddress, argumentName: 'restaurantAddress' },
            { argument: props.restaurantCity, argumentName: 'restaurantCity' }
        ]);
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message || '');
        }
        
        const vendorSignupRequest = new VendorSignupRequest({
            ...props,
            vendorVerificationStatus: props.vendorVerificationStatus ? props.vendorVerificationStatus : this.defaultVerificationStatus
        }, id)
        
        const isNewVendorSignupRequest = !id;
        if (isNewVendorSignupRequest) {
            vendorSignupRequest.addDomainEvent(new VendorSignupRequestCreated(vendorSignupRequest));
        }

        return Result.ok<VendorSignupRequest>(vendorSignupRequest);
    }

    private static defaultVerificationStatus: VendorVerificationStatus = 'PENDING'
}