import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface RestaurantRatingProps {
    value: number
}

export class RestaurantRating extends ValueObject<RestaurantRatingProps> {
    get value() {
        return this.props.value
    }

    private constructor(props: RestaurantRatingProps) {
        super(props)
    }

    public static create(props: RestaurantRatingProps): Result<RestaurantRatingProps> {
        if (!this.isValid(props.value)) {
            return Result.fail<RestaurantRatingProps>('Invalid rating. Rating must be between 0 and 6')
        } 
        return Result.ok<RestaurantRatingProps>(new RestaurantRating(props));
    }

    private static isValid(rating: number): boolean {
        if (rating < 1 || rating > 5) {
            return false
        }
        return true
    }
}