import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface FoodPriceProps {
    value: number
}

export class FoodPrice extends ValueObject<FoodPriceProps> {
    get value() {
        return this.props.value
    }

    private constructor(props: FoodPriceProps) {
        super(props)
    }

    public static create(props: FoodPriceProps): Result<FoodPrice> {
        if (!this.isValid(props.value)) {
            return Result.fail<FoodPrice>('Invalid food price')
        } 
        return Result.ok<FoodPrice>(new FoodPrice(props));
    }

    private static isValid(price: number): boolean {
        // Put some validation logic here
        return true
    }
}