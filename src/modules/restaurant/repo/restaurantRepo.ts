import { Restaurant } from "../domain/restaurant";

export interface IRestaurantRepo {
    save: (restaurant: Restaurant) => Promise<void>
}