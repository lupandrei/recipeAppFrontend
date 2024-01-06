import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { RecipeDto } from 'src/app/entity/recipe/recipe-dto';
import { Cuisine } from 'src/app/enum/Cuisine';
import { JwtService } from 'src/app/services/config/jwt.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-data-form',
  templateUrl: './recipe-data-form.component.html',
  styleUrls: ['./recipe-data-form.component.scss'],
})
export class RecipeDataFormComponent implements OnInit {
  @Input()
  id!:number;
  dataForm!: FormGroup;
  selectedImageUrl: string | ArrayBuffer | null = null;
  cuisines =  Object.keys(Cuisine).filter(k => isNaN(Number(k))); // Filter out numeric values

  constructor(private recipeService: RecipeService, private _snackBar: MatSnackBar, private router: Router,
    private jwtService:JwtService) {}

  ngOnInit(): void {
    console.log(this.id)
    if (this.id) {
      // If ID is available, load the existing recipe details and populate the form
      this.recipeService.getRecipeById(this.id).subscribe({
        next: (data: RecipeDto) => {
          console.log(data)
          this.populateFormWithData(data);
        },
        // handle error if needed
      });
    }
    this.dataForm = new FormGroup({
      title: new FormControl('', Validators.required),
      photo: new FormControl('photo', Validators.required),
      cookTime: new FormControl('', Validators.required),
      cuisine: new FormControl('', Validators.required),
      email: new FormControl(this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email'), Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          unit:new FormControl('grams',Validators.required)
        }),
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
          unit:new FormControl('grams',Validators.required)
        }),
      ]),
      steps: new FormArray([
        new FormGroup({
          number: new FormControl(1, Validators.required),
          text: new FormControl('', Validators.required),
        }),
        new FormGroup({
          number: new FormControl(2, Validators.required),
          text: new FormControl('', Validators.required),
        }),
      ]),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  addIngredient(event: Event) {
    event.preventDefault();
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      unit:new FormControl('grams',Validators.required),
      quantity: new FormControl('', Validators.required),
    });

    (<FormArray>this.dataForm.get('ingredients')).push(ingredientGroup);
  }

  addStep(event: Event) {
    event.preventDefault();
    const stepsFormArray = this.dataForm.get('steps') as FormArray;
    const lengthOfSteps = stepsFormArray.controls.length;
    const stepGroup = new FormGroup({
      number: new FormControl(lengthOfSteps + 1, Validators.required),
      text: new FormControl('', Validators.required),
    });
    (<FormArray>this.dataForm.get('steps')).push(stepGroup);
  }

  get ingredientsControls() {
    return (<FormArray>this.dataForm.get('ingredients')).controls;
  }

  get stepControls() {
    return (<FormArray>this.dataForm.get('steps')).controls;
  }

  deleteIngredient(i: number) {
    (<FormArray>this.dataForm.get('ingredients')).removeAt(i);
  }
  updateStepCounts(i: number) {
    const stepsFormArray = this.dataForm.get('steps') as FormArray;
    for (let j = i; j < stepsFormArray.length; j++) {
      const stepFormGroup = stepsFormArray.at(j) as FormGroup;
      const numberControl = stepFormGroup.get('number');
      if (numberControl) {
        const currentValue = numberControl.value;
        numberControl.setValue(currentValue - 1);
      }
    }
  }

  deleteStep(i: number) {
    this.updateStepCounts(i);
    (<FormArray>this.dataForm.get('steps')).removeAt(i);
  }

  updateStepsNumber(){
    const stepsFormArray = this.dataForm.get('steps') as FormArray;
    stepsFormArray.controls.forEach((stepGroup, index) => {
    const numberControl = stepGroup.get('number');
    if (numberControl) {
      numberControl.setValue(index + 1);
    }
  });
  }
  onSubmit() {
    if(this.id){
      this.updateStepsNumber();
      this.recipeService.updateRecipe(this.dataForm.value,this.id).subscribe({
        next: (data: RecipeDto) => {
          this._snackBar.open(`Updated successfully`, 'Close', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000); 
        },
      });
    }
    else{
      this.recipeService.addRecipe(this.dataForm.value).subscribe({
        next: (data: RecipeDto) => {
          this._snackBar.open(`Saved successfully`, 'Close', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000); 
        },
      });
    }
    
  }

  checkValid(controlName: string) {
    return (
      this.dataForm.get(controlName)?.invalid &&
      (this.dataForm.get(controlName)?.dirty ||
        this.dataForm.get(controlName)?.touched)
    );
  }

  checkValidFormArrayItem(arrayName:string,controlName:string,index:number){
    return(
      (this.dataForm.get(arrayName) as FormArray).at(index)?.get(controlName)?.invalid &&
      ((this.dataForm.get(arrayName) as FormArray).at(index)?.get(controlName)?.dirty ||
       (this.dataForm.get(arrayName) as FormArray).at(index)?.get(controlName)?.touched)
    )
  }

  populateFormWithData(recipeDetails: RecipeDto): void {
    this.dataForm.patchValue({
      title: recipeDetails.title,
      email:this.jwtService.getCookieField(Constants.AUTH_COOKIE,'email'),
      cookTime:recipeDetails.cookTime,
      cuisine: recipeDetails.cuisine,
    });
    this.selectedImageUrl = recipeDetails.photo;

    const ingredientsFormArray = this.dataForm.get('ingredients') as FormArray;
    ingredientsFormArray.clear();

    recipeDetails.ingredients.forEach((ingredient) => {
      const ingredientGroup = new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        unit: new FormControl(ingredient.unit, Validators.required),
        quantity: new FormControl(ingredient.quantity, Validators.required),
      });
      ingredientsFormArray.push(ingredientGroup);
    });
    const stepsFormArray = this.dataForm.get('steps') as FormArray;
    stepsFormArray.clear(); 

    recipeDetails.steps.forEach((step) => {
      const stepGroup = new FormGroup({
        number: new FormControl(step.number, Validators.required),
        text: new FormControl(step.text, Validators.required),
      });
      stepsFormArray.push(stepGroup);
    });
  }

}
