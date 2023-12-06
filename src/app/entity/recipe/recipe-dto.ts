import { IngredientDto } from "../ingredient/Ingredient-dto";
import { StepDto } from "../step/step-dto";
import { UserRecipeDisplayInformationDto } from "../user/user-recipe-display-information-dto";
import { RecipeDisplayDto } from "./recipe-display-dto";

export interface RecipeDto extends RecipeDisplayDto{
    steps: StepDto[];
    ingredients: IngredientDto[];
    userRecipeDisplayInformationDto: UserRecipeDisplayInformationDto;
    countReviews:number
}
