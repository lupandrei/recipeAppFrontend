import { Injectable } from '@angular/core';
import { RecipeSaveDto } from '../entity/recipe-saved/recipe-save-dto';
@Injectable()
export class Utils {
    public static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    public static toSaveDto(recipeId:number,email:string): RecipeSaveDto{
        const savedRecipeDto: RecipeSaveDto = {
            recipeId: recipeId,
            email: email,
            time: Utils.formatDate(new Date(Date.now()))
          };
          return savedRecipeDto;
    }
} 