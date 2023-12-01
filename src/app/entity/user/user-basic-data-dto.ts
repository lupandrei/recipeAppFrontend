import { UserSignUpDto } from "./user-sign-up-dto";

export interface UserBasicDataDto extends UserSignUpDto{
    description:string,
    profilePicture:string
}
