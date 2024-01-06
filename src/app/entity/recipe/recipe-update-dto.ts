import { Cuisine } from "src/app/enum/Cuisine";
import { StepDto } from "../step/step-dto";
import { IngredientDto } from "../ingredient/Ingredient-dto";

export interface RecipeUpdateDto{
    id:number,
    title:string,
    cuisine:Cuisine,
    photo:string,
    cookTime:string,
    steps:StepDto[],
    ingredients:IngredientDto[];
}