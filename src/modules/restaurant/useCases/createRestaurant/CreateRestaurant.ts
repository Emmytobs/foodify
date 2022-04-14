import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import UseCase from "../../../../shared/core/UseCase";
import UniqueEntityID from "../../../../shared/domain/UniqueEntityID";
import { Restaurant } from "../../domain/restaurant";
import { RestaurantRating } from "../../domain/restaurantRating";
import { UserId } from "../../domain/userId";
import { CreateRestaurantDTO } from "./CreateRestaurantDTO";

type CreateRestaurantResult = Result<void>

export class CreateRestaurant implements UseCase<any, CreateRestaurantResult> {

    constructor(
        private restaurantRepo: IRestaurantRepo
    ) {}

    async execute(dto: CreateRestaurantDTO) {
        try {
            const guardResult = Guard.againstNullOrUndefinedBulk([
                {argument: dto.userId, argumentName: "User id"},
                {argument: dto.vendorId, argumentName: "Vendor id"},
                {argument: dto.name, argumentName: "Name"},
                {argument: dto.address, argumentName: "Address"},
                {argument: dto.city, argumentName: "City"},
                {argument: dto.isActive, argumentName: "isActive"},
                {argument: dto.isVerified, argumentName: "isVerified"},
            ])
            if (!guardResult.succeeded) {
                throw new Error(guardResult.message)
            }

            const userId = UserId.create(
                new UniqueEntityID(dto.userId)
            )
            const vendorId = UserId.create(
                new UniqueEntityID(dto.vendorId)
            )

            const restaurantOrError = Restaurant.create({
                ...dto,
                userId: userId.getValue(),
                vendorId: vendorId.getValue()
            }
            
            )

        } catch (error) {
            throw new Error(error as string)
        }
    }

}