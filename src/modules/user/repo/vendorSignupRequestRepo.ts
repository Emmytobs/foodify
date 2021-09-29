import { VendorSignupRequest } from "../domain/vendorSignupRequest";

export interface IVendorSignupRequestRepo {
    exists: (id: string) => Promise<boolean>
    getVendorSignupRequestById: (id: string) => Promise<VendorSignupRequest | null>
    save: (vendorSignupRequest: VendorSignupRequest) => Promise<void>
}