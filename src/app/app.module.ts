import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { SignInAlternativeComponent } from './components/user-auth/sign-in-alternative/sign-in-alternative.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DishesWrapperComponent } from './components/dishes-wrapper/dishes-wrapper.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDataFormComponent } from './components/recipe-data-form/recipe-data-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignInAlternativeComponent,
    NavbarComponent,
    HomeComponent,
    FilterComponent,
    DishesWrapperComponent,
    DishCardComponent,
    AddRecipeComponent,
    HeaderComponent,
    RecipeDataFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
