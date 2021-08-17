import { FetchUserFromUserId } from "./FetchUserFromUserId";
import { userRepo } from '../../repo'

export const fetchUserFromUserId = new FetchUserFromUserId(userRepo)