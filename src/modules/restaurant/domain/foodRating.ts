import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface FoodRatingProps {
    value: number
}

export class FoodRating extends ValueObject<FoodRatingProps> {
    get value() {
        return this.props.value
    }

    private constructor(props: FoodRatingProps) {
        super(props)
    }

    public static create(props: FoodRatingProps): Result<FoodRating> {
        if (!this.isValid(props.value)) {
            return Result.fail<FoodRating>('Invalid rating. Rating must be between 0 and 6')
        } 
        return Result.ok<FoodRating>(new FoodRating(props));
    }

    private static isValid(rating: number): boolean {
        if (rating < 1 || rating > 5) {
            return false
        }
        return true
    }
}