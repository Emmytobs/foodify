import { Vendor } from "../domain/vendor";

export interface IVendorRepo {
    exists: (vendorId: string) => Promise<boolean>
    getVendorByUserId(vendorEmail: string): Promise<Vendor | null>
    save: (vendor: Vendor) => Promise<void>
}