import { Vendor } from "../domain/vendor";

export interface IVendorRepo {
    exists: (vendorId: string) => Promise<boolean>
    save: (vendor: Vendor) => Promise<void>
}