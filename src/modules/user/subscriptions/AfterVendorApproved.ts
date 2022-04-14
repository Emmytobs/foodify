import { DomainEvent, RegisterCallback } from "../../../shared/domain/events/DomainEvent";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { EmailService } from "../../../shared/services/email/emailService";
import { VendorApproved } from "../domain/events/VendorApproved";
import { CreateVendor } from "../useCases/createVendor/CreateVendor";
import { VerifyVendorSignedUp } from "../useCases/VerifyVendorSignedUp/VerifyVendorSignedUp";
import { VendorApprovedEmail, VendorApprovedButSignupRequiredEmail } from '../../../shared/services/email/emailTemplates'
import { config } from "../../../config";
import { FetchUserByEmail } from "../useCases/FetchUserByEmail/FetchUserByEmail";
import { FetchVendorByUserId } from "../useCases/FetchVendorByUserId.ts/FetchVendorByUserId";

export class AfterVendorApproved implements IHandle {
    constructor(
        // Insert usecases here
        private verifyVendorSignedUp: VerifyVendorSignedUp,
        private createVendor: CreateVendor,
        private fetchUserByEmail: FetchUserByEmail,
        private fetchVendorByUserId: FetchVendorByUserId,
        // Services
        private emailService: EmailService
        // private createRestaurant: CreateRestaurant
    ) {
        this.setupSubscription()
    }

    setupSubscription() {
        // Register domain event
        DomainEvent.register(this.onVendorApproved.bind(this) as RegisterCallback, VendorApproved.name)
    }

    async onVendorApproved(event: VendorApproved) {
        try {
            const { vendorSignupRequest } = event;
            // 1. Send an email to the vendor with a link for them to setup their vendor profile and fully sign up
            const vendorSignedUp = await this.verifyVendorSignedUp.execute({
                vendorSignupRequestEmail: vendorSignupRequest.vendorEmail.value
            });

            const useCaseFailed = vendorSignedUp.isLeft()
            if (useCaseFailed) {
                return
            }
    
            const result = vendorSignedUp.value
            const vendorHasNotSignupYet = vendorSignedUp.isRight() && result.getValue() === false
            const vendorHasSignedup = vendorSignedUp.isRight() && result.getValue() === true

            if (vendorHasNotSignupYet) { // Vendor has not signed up yet
                // Send email to vendor telling them to sign up
                await this.emailService.sendMail({
                    from: config.email.senderAddress,
                    to: vendorSignupRequest.vendorEmail.value,
                    ...new VendorApprovedButSignupRequiredEmail(vendorSignupRequest.vendorFirstname)
                })
                return;
            }
            if (vendorHasSignedup) {
                await this.emailService.sendMail({
                    from: config.email.senderAddress,
                    to: vendorSignupRequest.vendorEmail.value,
                    ...new VendorApprovedEmail(vendorSignupRequest.vendorFirstname)
                });
        
    
                // Step 1: Fetch user by email, get user id, create vendor
                const userOrNull = await this.fetchUserByEmail.execute({
                    email: vendorSignupRequest.vendorEmail.value
                })
                
                const user = userOrNull.getValue()
                if (user) {
                    await this.createVendor.execute({ userId: user.id.toString() })
                    // Step 2: Fetch vendor just created by user id attached to it, get vendor id, create restaurant
                    const vendorOrNull = await this.fetchVendorByUserId.execute({
                        associatedUserId: user.id.toString()
                    });

                    const vendor = vendorOrNull.getValue()
                    if (vendor) {
                        const vendorId = vendor.vendorId
                        // await this.createRestaurant.execute({ 
                            
                        // }) 
                    }
                }
                

            }

            
        } catch (error) {
            console.log(error)
        }
    }

    // private async getUserDataOfVendor() {
    //     const userOrNull = await this.fetchUserByEmail.execute({
    //         email: vendorSignupRequest.vendorEmail.value
    //     })
    // }
}