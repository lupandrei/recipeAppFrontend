import { Component, Input } from '@angular/core';
import { MacrosDto } from 'src/app/entity/macro/macro-dto';
import { NutritionixService } from 'src/app/services/nutritionix.service';
import Chart from 'chart.js/auto';
import { IngredientDto } from 'src/app/entity/ingredient/Ingredient-dto';
import { MetService } from 'src/app/services/met.service';
import { MetResultDto } from 'src/app/entity/macro/met-result-dto';
@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent {
  @Input()
  ingredients!: IngredientDto[];
  public chart: any;
  durations!: MetResultDto;
  calories!: number;
  constructor(private nutritionixService: NutritionixService, private metService: MetService) { }
  createChart(macros: MacrosDto) {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: [`Protein: ${macros.totalProtein}g`, `Carbs: ${macros.totalCarbs}g`, `Fats: ${macros.totalFats}g`],
        datasets: [{
          label: 'Macronutrients',
          data: [macros.totalProtein, macros.totalCarbs, macros.totalFats],
          backgroundColor: [
            'orange',
            'red',
            'yellow',
          ],
        }],
      },
      options: {
        aspectRatio: 1
      }

    });


  }
  ngAfterViewInit() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
  getMacros() {
    this.nutritionixService.getMacronutrients(this.ingredients).subscribe({
      next: (data)=>{
      this.createChart(data)
      this.calories = data.totalCalories
      this.metService.getDurations({ targetCalories: data.totalCalories, weight: 70 }).subscribe(
        {
          next: (data: any) => { this.durations = data; console.log(this.durations) }
        }
      )
      } 
    })
   
  }
}
