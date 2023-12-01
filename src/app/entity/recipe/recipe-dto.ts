import { IngredientDto } from "../ingredient/Ingredient-dto";
import { StepDto } from "../step/step-dto";
import { RecipeDisplayDto } from "./recipe-display-dto";

export interface RecipeDto extends RecipeDisplayDto{
    steps: StepDto[];
    ingredients: IngredientDto[];
}
