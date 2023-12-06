import { UserRecipeDisplayInformationDto } from "./user-recipe-display-information-dto";

export interface PaginatedUsersReponse{
    users:UserRecipeDisplayInformationDto[];
    numberOfUsers:number;
    numberOfPages:number;
}