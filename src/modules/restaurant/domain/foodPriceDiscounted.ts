import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface FoodPriceDiscountedProps {
    value: number
}

export class FoodPriceDiscounted extends ValueObject<FoodPriceDiscountedProps> {
    get value() {
        return this.props.value
    }

    private constructor(props: FoodPriceDiscountedProps) {
        super(props)
    }

    public static create(props: FoodPriceDiscountedProps): Result<FoodPriceDiscounted> {
        if (!this.isValid(props.value)) {
            return Result.fail<FoodPriceDiscounted>('Invalid food price')
        } 
        return Result.ok<FoodPriceDiscounted>(new FoodPriceDiscounted(props));
    }

    private static isValid(price: number): boolean {
        return true
    }
}