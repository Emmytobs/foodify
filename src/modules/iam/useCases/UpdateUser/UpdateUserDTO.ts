export interface UpdateUserDTO {
    userId: string
    fieldsToUpdate: {
        firstname?: string
        lastname?: string
        username?: string;
        // email?: string; Uncomment this when you've found a way to verify emails
        password?: string;
    }
}

export type UpdatablePropertiesOfTheUser = keyof UpdateUserDTO['fieldsToUpdate']