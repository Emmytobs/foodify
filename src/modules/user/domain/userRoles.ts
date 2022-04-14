// export type UserRoles = 'Vendor' | 'Customer' | 'Worker'

import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity"

export type ValidRoles = 'Vendor' | 'Customer' | 'Worker'

interface UserRolesProps {
    value: ValidRoles[]
};

export class UserRoles extends Entity<UserRolesProps> {
    get value() {
        return this.props.value
    }

    private constructor(props: UserRolesProps) {
        super(props);
    }

    public static create(props: UserRolesProps): Result<UserRoles> {
        if (!this.isValidRole(props)) {
            return Result.fail<UserRoles>('User role is invalid');
        }
        return Result.ok<UserRoles>(new UserRoles(props));
    }

    private static isValidRole(roles: UserRolesProps): boolean {
        for (const role of roles.value) {
            if (
                role !== 'Customer' &&
                role !== 'Vendor' && 
                role !== 'Worker'
            ) {
                return false;
            }
        }
        return true;
    }
}