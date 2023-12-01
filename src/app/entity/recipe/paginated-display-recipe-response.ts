import { RecipeDisplayDto } from "./recipe-display-dto";

export interface PaginatedDisplayRecipeResponse{
    recipes: RecipeDisplayDto[];
    numberOfPages:number;
    numberOfRecipes:number;
}