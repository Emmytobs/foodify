import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface FoodDescriptionProps {
    value: string    
}

export class FoodDescription extends ValueObject<FoodDescriptionProps> {
    get value() {
        return this.props.value;
    }

    private constructor(props: FoodDescriptionProps) {
        super(props)
    }

    static create(props: FoodDescriptionProps): Result<FoodDescription> {
        return Result.ok<FoodDescription>(new FoodDescription(props))
    }
}