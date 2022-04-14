import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface FoodNameProps {
    value: string
}

export class FoodName extends ValueObject<FoodNameProps> {

    private constructor(props: FoodNameProps) {
        super(props)
    }

    public static create(props: FoodNameProps): Result<FoodName> {
        if (!this.isValid) {
            return Result.fail<FoodName>('')
        }
        return Result.ok(new FoodName(props));
    }

    private static isValid(name: string): boolean {
        return true
    }
}