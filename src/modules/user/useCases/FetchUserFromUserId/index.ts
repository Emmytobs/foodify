import { FetchUserFromUserId } from "./FetchUserFromUserId";
import { sequelizeUserRepo } from '../../repo'

export const fetchUserFromUserId = new FetchUserFromUserId(sequelizeUserRepo)