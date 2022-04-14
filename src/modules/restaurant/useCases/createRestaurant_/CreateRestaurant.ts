import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right, Result } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";

type CreateRestaurantResult = Either<
    Result<void>,
    | AppError.InputError
    | AppError.UnexpectedError
>

// export class CreateRestaurantUseCase implements UseCase<CreateRestaurantDTO, CreateRestaurantError> {
    
//     async execute(dto): Promise<CreateRestaurantResult> {
//         return right(Result.ok<void>())
//     }
// }