import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-data-form',
  templateUrl: './recipe-data-form.component.html',
  styleUrls: ['./recipe-data-form.component.scss'],
})
export class RecipeDataFormComponent implements OnInit {
  dataForm!: FormGroup;
  selectedImageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
        console.log('load');
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      title: new FormControl('', Validators.required),
      cookTime: new FormControl('', Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
        }),
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required),
        }),
      ]),
      steps: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
      ]),
    });
  }

  addIngredient() {
    const ingredientGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });

    (<FormArray>this.dataForm.get('ingredients')).push(ingredientGroup);
  }

  addStep() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.dataForm.get('steps')).push(control);
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

  deleteStep(i: number) {
    (<FormArray>this.dataForm.get('steps')).removeAt(i);
  }

  onSubmit(){
    console.log(this.dataForm.value)
  }
}
