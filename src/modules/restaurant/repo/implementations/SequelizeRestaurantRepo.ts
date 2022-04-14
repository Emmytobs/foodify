import { RestaurantModel } from "../../../../shared/infra/database/sequelize/models/RestaurantModel";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepo } from "../restaurantRepo";

interface SequelizeRestaurantModel {
    RestaurantModel: typeof RestaurantModel
}

class SequelizeRestaurantRepo implements IRestaurantRepo {
    constructor(private models: SequelizeRestaurantModel) {}

    async save(restaurant: Restaurant) {
        // Let's assume the restaurant is a new one.
        const rawRestaurant = RestaurantMap
        this.models.RestaurantModel.create({  })

    }
}