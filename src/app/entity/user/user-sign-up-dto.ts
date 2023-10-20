import { UserLoginDto } from "./user-login-dto";

export interface UserSignUpDto extends UserLoginDto{
    firstName:string,
    lastName:string
}
