import { RestaurantAttr } from "../../../shared/infra/database/sequelize/models/RestaurantModel";
import { UserId } from "../../user/domain/userId";
import { Restaurant } from "../domain/restaurant";

export class RestaurantMap {
    toPersistence(restaurantEntity: Restaurant): /*RestaurantAttr*/ any {
        
        return {
            userId: restaurantEntity.userId.id.toString(),
            vendorId: restaurantEntity.vendorId.id.toString(),
            restaurantId: restaurantEntity.restaurantId.id.toString(),
            name: restaurantEntity.name,
            address: restaurantEntity.address,
            city: restaurantEntity.city,
            rating: restaurantEntity.rating.value,
            isActive: restaurantEntity.isActive,
            isVerified: restaurantEntity.isVerified
        } 
    }
}