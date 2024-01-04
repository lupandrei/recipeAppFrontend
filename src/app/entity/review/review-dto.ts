import { UserRecipeDisplayInformationDto } from "../user/user-recipe-display-information-dto";

export interface ReviewDto{
    id:number,
    user:UserRecipeDisplayInformationDto,
    reviewText:string,
    rating:number
}