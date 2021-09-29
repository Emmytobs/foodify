import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { FoodDescription } from "./foodDescription";
import { FoodId } from "./foodId";
import { FoodName } from "./foodName";
import { FoodPrice } from "./foodPrice";
import { FoodPriceDiscounted } from "./foodPriceDiscounted";
import { FoodRating } from "./foodRating";
import { RestaurantId } from "./restaurantId";

interface FoodProps {
    foodId: FoodId
    rating: FoodRating
    restaurantId: RestaurantId
    name: FoodName
    description: FoodDescription
    price: FoodPrice
    // images: FoodImages
    discountedPrice?: FoodPriceDiscounted
}

export class Food extends AggregateRoot<FoodProps> {

}