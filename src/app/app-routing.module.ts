import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'sign-up',component:SignUpComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent},
  {path:'filter',component:FilterComponent},
  {path:'add',component:AddRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
