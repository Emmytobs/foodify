import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import UniqueEntityID from "../../../shared/domain/UniqueEntityID";
import { UserId } from "../../user/domain/userId";
import { Food } from "./food";
import { RestaurantId } from "./restaurantId";
import { RestaurantRating } from "./restaurantRating";
import { RestaurantVerificationStatus } from "./restaurantVerificationStatus";
import { VendorId } from "../../user/domain/vendorId";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";

interface RestaurantProps {
    userId: UserId
    vendorId: VendorId
    name: string
    address: string,
    city: string
    food: Food
    rating?: RestaurantRating
    isActive: boolean
    hasFoodListings?: boolean
    // verificationStatus: RestaurantVerificationStatus
    // isVerified: boolean
}

export class Restaurant extends AggregateRoot<RestaurantProps> {
    get restaurantId(): RestaurantId {
        return RestaurantId.create(this._id).getValue()
    }
    get userId(): UserId {
        return this.props.userId
    }
    get vendorId(): VendorId {
        return this.props.vendorId
    }
    get name() { return this.props.name }
    get address() { return this.props.address }
    get city() { return this.props.city }
    get food(): Food { return this.props.food }
    get rating(): RestaurantRating | null { return this.props.rating || null }
    get isActive(): boolean { return this.props.isActive }
    // get verificationStatus(): RestaurantVerificationStatus { return this.props.verificationStatus }
    // get isVerified(): boolean { return this.props.isVerified }

    
    private constructor(props: RestaurantProps, id?: UniqueEntityID) {
        super(props, id)
    }

    static create(props: RestaurantProps, id?: UniqueEntityID): Result<Restaurant> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.address, argumentName: 'address' },
            { argument: props.city, argumentName: 'city' },
            { argument: props.userId, argumentName: 'userId' },
            { argument: props.vendorId, argumentName: 'vendorId' },
        ]);
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message as string);
        }

        const restaurant = new Restaurant({
            ...props,
            isActive: props.isActive ? props.isActive : false,
            hasFoodListings: props.hasFoodListings ? props.hasFoodListings : false
        });

        const isNewRestaurant = !id;

        if (isNewRestaurant) {
            // dispatch domain event
        }

        return Result.ok<Restaurant>(restaurant);
    }
}