import { Cuisine } from "src/app/enum/Cuisine";
import { IngredientDto } from "../ingredient/Ingredient-dto";
import { StepDto } from "../step/step-dto";

export interface RecipeAddDto{
    email:string;
    title:string;
    steps:StepDto[];
    ingredients:IngredientDto[];
    photo:String;
    cuisine:Cuisine;
    cookTime:string;
}