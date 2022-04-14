export interface CreateRestaurantDTO {
    vendorId: string
    userId: string
    name: string
    address: string
    city: string
    // rating: string
    verificationStatus: string
    isActive: boolean
    isVerified: boolean
}